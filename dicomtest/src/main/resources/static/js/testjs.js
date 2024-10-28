document.addEventListener('DOMContentLoaded', () => {
    
    // cornerstone 초기화
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;

    const element = document.getElementById('dicomImage');
    cornerstone.enable(element);
    
    let currentIndex = 0;  // 현재 이미지 인덱스 초기화
    const totalImages = imagePaths.length;  // 전체 이미지 개수

    // 첫 번째 이미지를 로드
    loadAndDisplayImage(imagePaths[currentIndex]);

    // 이미지를 로드하고 표시하는 함수
    function loadAndDisplayImage(filename) {
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
            const imageId = `wadouri:http://localhost:8080/dicom-file/${imagePaths[currentIndex]}`;
            
            console.log("이미지 로드 경로:", imageId);  // 경로 확인을 위해 로그 출력
            
            cornerstone.loadImage(imageId).then(function(image) {
                cornerstone.displayImage(element, image);
            }).catch(function(err) {
                console.error('이미지 로드 실패:', err);
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
