document.addEventListener('DOMContentLoaded', () => {
	// cornerstone 초기화
    if (typeof cornerstone === 'undefined' || typeof cornerstoneWADOImageLoader === 'undefined') {
	    console.error("Cornerstone 또는 Cornerstone WADO Image Loader가 초기화되지 않았습니다.");
	    return;
	}
    
    // cornerstone 초기화
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;

    const element = document.getElementById('dicomImage');
    if (!element) {
        console.error("dicomImage 요소를 찾을 수 없습니다.");
        return;
    }
    cornerstone.enable(element);
    
    // 이미지 레이아웃/시리즈 레이아웃 호출 함수
    if (element) {
        cornerstone.enable(element);
        initializeImageLayout(element);  // 이미지 레이아웃 초기화 함수 호출
    }
	// initializeSeriesLayout 호출을 시도하기 전에 함수 정의 여부를 확인
	if (typeof initializeSeriesLayout === 'function') {
	    console.log("initializeSeriesLayout 함수가 정의되었습니다.");
	    initializeSeriesLayout();
	} else {
	    console.error("initializeSeriesLayout 함수가 정의되지 않았습니다.");
	}
    
    
    if (!Array.isArray(imagePaths) || imagePaths.length === 0) {
        console.error("imagePaths 배열이 비어 있거나 정의되지 않았습니다.");
        return;
    }
    
    let currentIndex = 0;  // 현재 이미지 인덱스 초기화
    const totalImages = imagePaths.length;  // 전체 이미지 개수

    // 첫 번째 이미지를 로드
    loadAndDisplayImage(imagePaths[currentIndex]);

    // 이미지를 로드하고 표시하는 함수
    function loadAndDisplayImage(filename) {
		if (!filename) {
            console.error("filename이 비어 있습니다.");
            return;
        }
        
        const imageId = `wadouri:http://localhost:8080/dicom-file/${filename}`;  // HTTP 경로 사용
        console.log("filename 넘겨받은 경로 :: ", filename);
        
        cornerstone.loadImage(imageId).then(image => {
            cornerstone.displayImage(element, image);
        }).catch(err => {
            console.error('이미지 로드 실패:', err);
        });
    }

    // 이미지를 인덱스로 업데이트하는 함수
    function updateTheImage(imageIndex) {
	    if (imageIndex >= 0 && imageIndex < totalImages) {
	        currentIndex = imageIndex;
	        const filename = imagePaths[currentIndex];
	        if (!filename) {
	            console.error("Filename not found for current index:", currentIndex);
	            return;
	        }
	        const imageId = `wadouri:http://localhost:8080/dicom-file/${filename}`;
	        console.log("이미지 로드 경로:", imageId);
	
	        cornerstone.loadImage(imageId).then(image => {
	            cornerstone.displayImage(element, image);
	        }).catch(err => {
	            console.error("이미지 로드 실패:", err);
	        });
	    }
	}


    // 마우스 휠 이벤트로 이미지 전환 (다음/이전 이미지 표시)
    element.addEventListener('wheel', function (e) {
        e.preventDefault();  // 기본 스크롤 방지
        console.log('deltaY:', e.deltaY);  // deltaY 값 확인

        if (e.deltaY > 0) {
            // 휠을 아래로 스크롤: 다음 이미지로 이동
            if (currentIndex < totalImages - 1) {
                updateTheImage(currentIndex + 1);
            }
        } else {
            // 휠을 위로 스크롤: 이전 이미지로 이동
            if (currentIndex > 0) {
                updateTheImage(currentIndex - 1);
            }
        }
    });

    // 첫 번째 이미지를 페이지 로드 시 표시
    updateTheImage(0);

});
