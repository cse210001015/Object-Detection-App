const cocoSsd = require('@tensorflow-models/coco-ssd');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs').promises;
const gm=require('gm');
const fs1=require('fs');
const express=require('express');
const ffmpegStatic = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');
const ffprobe=require('ffprobe');
const ffprobeStatic = require('ffprobe-static');
const fsextra = require('fs-extra')
let app1=require('express')();
let http=require('http').createServer(app1);


ffmpeg.setFfmpegPath(ffmpegStatic);

let c=0;
let app=express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit:'30000MB'}))

app.get('/',(req,res) =>{
    return res.send("Hello World");
});

let make_boxes=(predictions,imgpath,_callback)=>{
  img=gm(imgpath);
  let l=predictions.length;
  for(let i=0;i<l;i++){
    let a=predictions[i].bbox;
    let pred=predictions[i].class;
    let x1=a[0],x2=a[0]+a[2],x3=a[0]+a[2],x4=a[0];
    let y1=a[1],y2=a[1],y3=a[1]+a[3],y4=a[1]+a[3];

    img
    .stroke('red')
    .strokeWidth(5)
    .drawLine(x1,y1,x2,y2)
    .drawLine(x2,y2,x3,y3)
    .drawLine(x3,y3,x4,y4)
    .drawLine(x4,y4,x1,y1)
    .stroke('black')
    .strokeWidth(1)
    .fontSize(c)
    .drawText(x1,y1-2,pred);
  }

  img.write(imgpath,(err)=>{
    if(err)     console.log(err);
    else        console.log(`Successfully Drew the bounding boxes and saved the image at ${imgpath}`);
    _callback();
  });
}

// Load the Coco SSD model and image.
let make_predictions=(image_path,_callback)=>{
  Promise.all([cocoSsd.load(), fs.readFile(image_path)])
  .then((results) => {
    // First result is the COCO-SSD model object.
    const model = results[0];
    // Second result is image buffer.
    const imgTensor = tf.node.decodeImage(new Uint8Array(results[1]), 3);
    // Call detect() to run inference.
    predictions=model.detect(imgTensor);
    // console.log(predictions);
    return predictions;
  })
  .then((predictions) => {
    make_boxes(predictions,image_path,()=>{
      //console.log(JSON.stringify(predictions,null,2));
      _callback();
    });
  });
}

app.post('/',(req,res) =>{
  path='image.jpg';
  console.log("Hello");

  fs1.writeFile(path,req.body.imgsource,'base64',(err)=>{
      if(err) console.log(err);
  });

  c=100;
  make_predictions(path,()=>{
    const contents = fs1.readFileSync(path, {encoding: 'base64'});
    return res.send(contents);
  });
});

let make_bboxes=(no_of_frames,i,_callback)=>{
  let s="00000";
  let j=i, c=4;
  while(j>0){
    let r=j%10;
    j=Math.floor(j/10);
    s=s.substring(0, c) + r + s.substring(c+1);
    c--;
  }

  let s1='Frames/frame-'+s+'.png';

  make_predictions(s1,()=>{
    console.log("Done "+s1);
    if(i<no_of_frames )  make_bboxes(no_of_frames,i+1,()=>{
      console.log("Callback Fired "+i);
      _callback();
    });
    else{ 
      console.log("Callback Fired "+i);
      _callback();
    }
  });
};

let process_video=(path,_callback)=>{
  c=25;
  fsextra.emptyDirSync('Frames');
  ffmpeg()
  .input(path)
  .saveToFile('Frames/frame-%05d.png')
  .on('end', () => {
    console.log('Frames are extracted');
    ffprobe(path, { path: ffprobeStatic.path })
    .then(function (info,err) {
      let no_of_frames,fps;
      try{
        no_of_frames=info.streams[1].nb_frames;
        fps=info.streams[1].avg_frame_rate;
      }catch{
        no_of_frames=info.streams[0].nb_frames;
        fps=info.streams[0].avg_frame_rate;
      };

      console.log(fps);
      make_bboxes(no_of_frames,1,()=>{
        ffmpeg()
        .input('Frames/frame-%05d.png')
        .inputOptions('-framerate', fps)
        .videoCodec('libx264')
        .outputOptions('-pix_fmt', 'yuv420p')
        .saveToFile('video.mp4')
        .on('end', () => {
          console.log("Done");
          _callback();
        })
      });
    });
  })
  .on('error', (error) => {
    console.error(error);
  });
};

app.listen(3000,()=>{
  console.log("Listening on port 3000");
}); 


http.listen(4000,()=>{
    console.log("Listening on port 4000");
});

let videobase64='';
let io=require('socket.io')(http,{maxHttpBufferSize: 1e8});
io.on('connection', (socket) => {
    console.log('Client connected.');
  
    // Handle incoming data from client
    socket.on('file', (file) => {
        videobase64+=file;
        console.log('File received:', file.length);
    });

    socket.on('done',(Success)=>{
        console.log(videobase64.length);
        let path='video.mp4';
        fs1.writeFileSync(path,videobase64,{encoding:'base64'});
        videobase64='';
        
        process_video(path,()=>{
          let videotosend=fs1.readFileSync(path,{encoding:'base64'});
          while(videotosend.length>931388){
              let s=videotosend.substring(0,931388);
              videotosend=videotosend.substring(931388,videotosend.length);
              socket.emit('file_complete',s);
          }
          if(videotosend.length>0)    socket.emit('file_complete',videotosend);
          videotosend='';
          socket.emit('done_file','Success');
        });
    });

    socket.on('ask',(data)=>{
        socket.emit('length',videobase64.length);
    })
  
    // Handle client disconnecting
    socket.on('disconnect', () => {
      videobase64='';
      console.log('Client disconnected.');
    });
});