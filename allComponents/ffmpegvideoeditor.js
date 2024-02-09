// $ ffmpeg \
// -loop 1 -t 5 -i happy1.jpg \
// -loop 1 -t 5 -i happy2.jpg \
// -loop 1 -t 5 -i happy3.jpg \
// -loop 1 -t 5 -i happy4.jpg \
// -loop 1 -t 5 -i happy5.jpg \
// -loop 1 -t 5 -i happy6.jpg \
// -i freeflow.mp3 \
// -filter_complex \
// "[0:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=out:st=4:d=1[v0]; \
//  [1:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=4:d=1[v1]; \
//  [2:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=4:d=1[v2]; \
//  [3:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=4:d=1[v3]; \
//  [4:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=4:d=1[v4]; \
//  [5:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=4:d=1[v5]; \
//  [v0][v1][v2][v3][v4][v5]concat=n=6:v=1:a=0,format=yuv420p[v]" -map "[v]" -map 6:a -shortest output7.mp4