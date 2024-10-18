document.addEventListener('DOMContentLoaded', () => {
    // cornerstone 초기화
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;

    const element = document.getElementById('dicomImage');
    cornerstone.enable(element);

    let currentIndex = 0;  // 현재 이미지 인덱스 초기화
    const totalImages = imagePaths.length;  // 전체 이미지 개수
    let gridSize = { rows: 1, cols: 1 };  // 그리드 사이즈 정보

    // 그리드 레이아웃 생성 및 이미지 로드
    function generateImageGrid(rows, cols) {
        gridSize = { rows, cols };  // 현재 그리드 사이즈 저장
        const gridContainer = document.getElementById('dicomImage');
        gridContainer.innerHTML = '';  // 기존의 그리드를 초기화

        // 선택한 행과 열에 맞춰 그리드 레이아웃 설정
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        // 각 셀에 이미지를 로드하여 배치
        for (let i = 0; i < rows * cols; i++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');

            // 그리드에 맞춰 이미지 크기 설정
            gridItem.style.width = '100%';
            gridItem.style.height = '100%';
            gridContainer.appendChild(gridItem);

            // 각 그리드 아이템에 Cornerstone 활성화
            cornerstone.enable(gridItem);

            // 이미지가 있는 셀은 이미지 로드, 없는 셀은 검은색 배경 적용
            if (i < totalImages) {
                const imageId = `wadouri:http://localhost:8080/dicom-file/${imagePaths[(currentIndex + i) % totalImages]}`;
                
                try {
                    cornerstone.loadImage(imageId).then(function(image) {
                        cornerstone.displayImage(gridItem, image).then(() => {
                            // 이미지가 로드되면 부드럽게 opacity 1로 전환
                            gridItem.style.opacity = '1';
                        });
                    }).catch(err => {
                        console.error('이미지 로드 실패:', err);  // 오류 발생 시 로그 출력
                    });
                  } catch (error) {
                      console.error('cornerstone.loadImage에서 예외 발생:', error);
                  }
	            } else {
	                // 이미지가 없을 경우 검은색 배경을 적용
	                gridItem.style.backgroundColor = 'black';  // 검은색 배경
	            }
	        }
    }

    // 이미지를 모두 전환하는 함수 (다음 이미지로)
    function loadNextImages() {
        if (currentIndex + gridSize.rows * gridSize.cols < totalImages) {
            currentIndex = (currentIndex + gridSize.rows * gridSize.cols) % totalImages;  // 그리드 전체 사이즈 만큼 인덱스 증가
            generateImageGrid(gridSize.rows, gridSize.cols);  // 모든 이미지를 다시 로드
        }
    }
    
    // 이미지를 모두 전환하는 함수 (이전 이미지로)
    function loadPrevImages() {
        if (currentIndex - gridSize.rows * gridSize.cols >= 0) {
            currentIndex = (currentIndex - gridSize.rows * gridSize.cols + totalImages) % totalImages;  // 인덱스 감소
            generateImageGrid(gridSize.rows, gridSize.cols);  // 모든 이미지를 다시 로드
        }
    }

    // 드롭다운에서 행과 열 선택
    document.getElementById('imgLayoutBtn').addEventListener('click', () => {
        const dropdown = document.getElementById('dropdown');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    // 그리드 선택 및 적용
    const gridSelector = document.getElementById('grid-selector');
    
    for (let i = 1; i <= 5; i++) {
        for (let j = 1; j <= 5; j++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-selector-item');
            gridItem.dataset.row = i;
            gridItem.dataset.col = j;

            // 마우스 호버 시 선택된 행과 열을 시각적으로 표시
            gridItem.addEventListener('mouseover', function () {
                highlightGridSelection(i, j);
            });

            // 그리드 아이템 클릭 시 선택된 행과 열에 맞게 이미지 그리드를 생성
            gridItem.addEventListener('click', function () {
                const rows = parseInt(gridItem.dataset.row);
                const cols = parseInt(gridItem.dataset.col);
                generateImageGrid(rows, cols);  // 선택된 행과 열에 맞춰 그리드 생성
                
                // 선택 후 드롭다운 닫기 및 초기화
                document.getElementById('dropdown').style.display = 'none';  
                resetGridSelection();  // 그리드 선택 초기화
            });

            gridSelector.appendChild(gridItem);
        }
    }

    // 선택한 그리드 셀을 시각적으로 강조하는 함수
    function highlightGridSelection(rows, cols) {
        const gridItems = document.querySelectorAll('.grid-selector-item');
        gridItems.forEach(item => {
            const itemRow = parseInt(item.dataset.row);
            const itemCol = parseInt(item.dataset.col);
            if (itemRow <= rows && itemCol <= cols) {
                item.classList.add('selected');  // 선택된 셀 강조
            } else {
                item.classList.remove('selected');  // 강조 제거
            }
        });
    }

    // 그리드 선택 초기화 함수 (초기 상태로 돌아가게)
    function resetGridSelection() {
        const gridItems = document.querySelectorAll('.grid-selector-item');
        gridItems.forEach(item => {
            item.classList.remove('selected');  // 선택된 셀 강조 해제
        });
    }

    // 첫 번째 이미지를 페이지 로드 시 표시
    generateImageGrid(1, 1);  // 기본으로 1x1 그리드로 시작

    // 마우스 휠을 이용한 이미지 전환 기능 추가 (모든 이미지 전환)
    element.addEventListener('wheel', function (e) {
        e.preventDefault();  // 기본 스크롤 방지
        console.log('deltaY:', e.deltaY);  // deltaY 값 확인

         // 휠을 아래로 스크롤: 다음 이미지로 이동 (마지막 이미지 도달 시 이동 불가)
        if (e.deltaY > 0 && currentIndex + gridSize.rows * gridSize.cols < totalImages) {
            loadNextImages();
        }
        // 휠을 위로 스크롤: 이전 이미지로 이동 (첫 번째 이미지 도달 시 이동 불가)
        else if (e.deltaY < 0 && currentIndex - gridSize.rows * gridSize.cols >= 0) {
            loadPrevImages();
        }
    });
});
