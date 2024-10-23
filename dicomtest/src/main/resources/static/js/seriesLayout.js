document.addEventListener('DOMContentLoaded', () => {

    const gridContainer = document.getElementById('dicomImage');

    // 'dicomImage' 요소가 존재하는지 확인
    if (!gridContainer) {
        console.error("Element with ID 'dicomImage' not found.");
        return;  // gridContainer가 없으면 함수 실행 중단
    }

    // cornerstone 초기화
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;
    cornerstone.enable(gridContainer);

    let gridSize = { rows: 1, cols: 1 };  // 그리드 사이즈 정보

    // 그리드 레이아웃 생성 및 시리즈 이미지 로드
    function generateSeriesLayout(rows, cols) {
		 // 'dicomImage' 요소가 여전히 존재하는지 확인

        if (!gridContainer) {

            console.error("Grid container not found.");

            return;

        }
        
        gridSize = { rows, cols };
        gridContainer.innerHTML = '';  // 기존의 그리드를 초기화

        // 선택한 행과 열에 맞춰 그리드 레이아웃 설정
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        // 각 셀에 시리즈 이미지를 로드하여 배치
        for (let i = 0; i < rows * cols; i++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.style.width = '100%';
            gridItem.style.height = '100%';
            gridContainer.appendChild(gridItem);

            // Cornerstone 활성화
            cornerstone.enable(gridItem);

            // 이미지 로드 (예시 URL 사용)
            if (i < seriesKeys.length) {
                const seriesKey = seriesKeys[i];
                const imageId = `wadouri:http://localhost:8080/dicom-file/${seriesKey}/first-image`;
                
                // seriesKey와 imageId를 로그로 출력하여 확인
                console.log(`Loading image for seriesKey: ${seriesKey}, imageId: ${imageId}`);

                try {
                    cornerstone.loadImage(imageId).then(function (image) {
                        cornerstone.displayImage(gridItem, image);
                    }).catch(err => {
                        console.error('이미지 로드 실패:', err);
                    });
                } catch (error) {
                    console.error('cornerstone.loadImage에서 예외 발생:', error);
                }
            } else {
                // 시리즈가 없을 경우 검은색 배경 적용
                gridItem.style.backgroundColor = 'black';
            }
        }
    }

    // 그리드 선택 및 적용
    const gridSelector = document.getElementById('seriesGridSelector');
    for (let row = 1; row <= 5; row++) {
        for (let col = 1; col <= 5; col++) {
            const gridOption = document.createElement('div');
            gridOption.classList.add('grid-option');
            gridOption.dataset.row = row;
            gridOption.dataset.col = col;

            // 마우스 호버 시 선택된 행과 열을 시각적으로 표시
            gridOption.addEventListener('mouseover', function () {
                highlightGridSelection(row, col);
            });

            // 그리드 아이템 클릭 시 선택된 행과 열에 맞게 시리즈 그리드 생성
            gridOption.addEventListener('click', function () {
                const selectedRows = parseInt(gridOption.dataset.row);
                const selectedCols = parseInt(gridOption.dataset.col);
                generateSeriesLayout(selectedRows, selectedCols);
                document.getElementById('seriesDropdown').style.display = 'none';  // 드롭다운 닫기
                resetGridSelection();  // 그리드 선택 초기화
            });

            gridSelector.appendChild(gridOption);
        }
    }

    // 선택한 그리드 셀을 시각적으로 강조하는 함수
    function highlightGridSelection(rows, cols) {
        const gridItems = document.querySelectorAll('.grid-option');
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

    // 그리드 선택 초기화 함수
    function resetGridSelection() {
        const gridItems = document.querySelectorAll('.grid-option');
        gridItems.forEach(item => {
            item.classList.remove('selected');  // 선택된 셀 강조 해제
        });
    }

    // 첫 번째 시리즈 그리드를 기본 1x1 레이아웃으로 생성
    generateSeriesLayout(1, 1);
});
