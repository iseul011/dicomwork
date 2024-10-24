document.addEventListener('DOMContentLoaded', () => {

    // URL에서 seriesKeys 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search);
    const seriesKeys = urlParams.get('seriesKeys') ? urlParams.get('seriesKeys').split(',') : [];

    if (seriesKeys.length === 0) {
        console.error('시리즈 키가 정의되지 않았거나 빈 배열입니다.');
        return;
    }
    
    console.log('시리즈 키 리스트:', seriesKeys);  // 시리즈 키를 콘솔에 출력하여 확인

    // cornerstone 초기화
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;
    
    cornerstoneWADOImageLoader.configure({
        useWebWorkers: true,  // Web Workers를 사용하여 성능 개선
    });

    const element = document.getElementById('dicomImage');
    if (!element) {
        console.error("Element with ID 'dicomImage' not found.");
        return;
    }
    cornerstone.enable(element);

    let currentIndex = 0;  // 현재 이미지 인덱스 초기화

    const seriesLayoutBtn = document.getElementById('seriesLayoutBtn');
    const seriesDropdown = document.getElementById('seriesDropdown');

    // 시리즈 레이아웃 버튼 클릭 시 드롭다운 표시/숨김
    seriesLayoutBtn?.addEventListener('click', () => {
        if (seriesDropdown.style.display === 'block') {
            seriesDropdown.style.display = 'none'; // 드롭다운 숨기기
        } else {
            seriesDropdown.style.display = 'block'; // 드롭다운 표시하기
        }
    });

    const gridContainer = document.getElementById('dicomImage');
    if (!gridContainer) {
        console.error("Element with ID 'dicomImage' not found.");
        return;
    }

    // 그리드 선택 및 생성
    const gridSelector = document.getElementById('seriesGridSelector');
    if (!gridSelector) {
        console.error("Element with ID 'seriesGridSelector' not found.");
        return;
    }

    for (let row = 1; row <= 5; row++) {
        for (let col = 1; col <= 5; col++) {
            const gridOption = document.createElement('div');
            gridOption.classList.add('grid-option');
            gridOption.dataset.row = row;
            gridOption.dataset.col = col;

            gridOption.addEventListener('mouseover', function () {
                highlightGridSelection(row, col);
            });

            gridOption.addEventListener('click', function () {
                const selectedRows = parseInt(gridOption.dataset.row);
                const selectedCols = parseInt(gridOption.dataset.col);
                generateSeriesLayout(selectedRows, selectedCols);
                seriesDropdown.style.display = 'none';  
                resetGridSelection();  
            });

            gridSelector.appendChild(gridOption);
        }
    }

    // 그리드 셀 강조 표시
    function highlightGridSelection(rows, cols) {
        const gridItems = document.querySelectorAll('.grid-option');
        gridItems.forEach(item => {
            const itemRow = parseInt(item.dataset.row);
            const itemCol = parseInt(item.dataset.col);
            if (itemRow <= rows && itemCol <= cols) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    let gridSize = { rows: 1, cols: 1 };

    // 그리드 레이아웃 생성 및 시리즈 첫 번째 이미지 로드
    function generateSeriesLayout(rows, cols) {
        gridSize = { rows, cols };
        gridContainer.innerHTML = '';  

        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        // 각 셀에 시리즈 첫 번째 이미지를 로드하여 배치
        for (let i = 0; i < rows * cols; i++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.style.width = '100%';
            gridItem.style.height = '100%';
            gridContainer.appendChild(gridItem);

            cornerstone.enable(gridItem);

            // 이미지 로드 (시리즈의 첫 번째 이미지)
            if (i < seriesKeys.length) {
                const seriesKey = seriesKeys[i];
                const imageId = `wadouri:http://localhost:8080/dicom-file/${seriesKey}/first-image`;

                console.log(`Loading image for seriesKey: ${seriesKey}, imageId: ${imageId}`);

                try {
                    cornerstone.loadImage(imageId).then(function (image) {
                        cornerstone.displayImage(gridItem, image);
                    }).catch(err => {
                        console.error(`이미지 로드 실패 (seriesKey: ${seriesKey}):`, err);
                    });
                } catch (error) {
                    console.error('cornerstone.loadImage에서 예외 발생:', error);
                }
            } else {
                gridItem.style.backgroundColor = 'black';  
            }
        }
    }

    // 그리드 초기화
    function resetGridSelection() {
        const gridItems = document.querySelectorAll('.grid-option');
        gridItems.forEach(item => {
            item.classList.remove('selected');
        });
    }

    // 첫 번째 시리즈 그리드를 기본 1x1 레이아웃으로 생성
    generateSeriesLayout(1, 1);
});
