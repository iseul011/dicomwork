/*document.addEventListener('DOMContentLoaded',()=>{
	// cornerstone 초기화 문구
	cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
	
	cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;
	
	// 이미지를 넣을 요소 얻어오기
	const element = document.getElementById('dicomImage');
	
	// 이미지 요소를 초기화 (반드시 해야함)
	cornerstone.enable(element);
	
	// 이미지 얻어오기 (static은 루트임 그 아래부터 경로 잡아주면 됨. )
	
	const imageId = 'wadouri:/img/sample.dcm';  // 실제 이미지 경로 설정
	
	/*
	cornerstone.loadImage(imageId)
			   .then(image =>{cornerstone.displayImage(element, image);
			 }).catch(err =>{
				  console.log('이미지로드 실패:',err);
			 })
	
	
	 const viewportOptions = {
        scale: 6.0,
        translation: {
            x: -24,
            y: 10
        },
        voi: {
            windowWidth: 89,
            windowCenter: 150
        },
        invert: false,
        pixelReplication: false
    };
    
    // 이미지를 로드하여 표시
    cornerstone.loadImage(imageId).then(function (image) {
        cornerstone.displayImage(element, image, viewportOptions);
    }).catch(function (err) {
        console.log('이미지 로드 실패:', err);
    });
	
})*/

document.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById('dicomImage');
    cornerstone.enable(element);
    
    // 각 이미지의 링크를 클릭하면 해당 이미지가 로드됨
    const imageLinks = document.querySelectorAll('a');
    imageLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const imageId = event.target.getAttribute('href'); // 이미지 경로 가져오기
            cornerstone.loadImage(imageId).then(image => {
                cornerstone.displayImage(element, image);
            }).catch(err => {
                console.error('이미지 로드 실패:', err);
            });
        });
    });
});
