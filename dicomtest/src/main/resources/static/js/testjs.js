document.addEventListener('DOMContentLoaded', () => {
    // cornerstone 초기화
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;

    const element = document.getElementById('dicomImage');
    cornerstone.enable(element);
    
    // 이미지를 넣을 요소 얻어오기
    let currentIndex = 0;  // 현재 이미지 인덱스 초기화
    const totalImages = imagePaths.length;  // 전체 이미지 개수

    // 첫 번째 이미지를 로드
    loadAndDisplayImage(imagePaths[currentIndex]);

    function loadAndDisplayImage(filename) {
        const imageId = `wadouri:http://localhost:8080/dicom-file/${filename}`;  // HTTP 경로 사용
        console.log("filename 넘겨받은 경로 :: ", filename);
        cornerstone.loadImage(imageId).then(image => {
            cornerstone.displayImage(element, image);
        }).catch(err => {
            console.error('이미지 로드 실패:', err);
        });
    }

    // 이전/다음 버튼 클릭 처리
    document.getElementById('nextImage').addEventListener('click', () => {
        if (currentIndex < totalImages - 1) {  // 마지막 이미지가 아닐 때만 증가
            currentIndex++;
            loadAndDisplayImage(imagePaths[currentIndex]);
        } else {
            console.log("더 이상 다음 이미지가 없습니다.");
        }
    });

    document.getElementById('prevImage').addEventListener('click', () => {
        if (currentIndex > 0) {  // 첫 번째 이미지가 아닐 때만 감소
            currentIndex--;
            loadAndDisplayImage(imagePaths[currentIndex]);
        } else {
            console.log("더 이상 이전 이미지가 없습니다.");
        }
    });
});
