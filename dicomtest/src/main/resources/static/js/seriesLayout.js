// 시리즈 레이아웃 활성화 함수
function activateSeriesLayout() {
	console.log("Series layout activated");  // 로그 추가하여 확인
    // 시리즈 레이아웃 활성화
    document.getElementById('seriesDropdown').style.display = 'block';
    // 이미지 레이아웃 비활성화
    document.getElementById('dropdown').style.display = 'none';
}

// 모든 페이지 콘텐츠가 로드된 후 실행
window.onload = () => {
    const seriesLayoutBtn = document.getElementById('seriesLayoutBtn');
    
    if (seriesLayoutBtn) {
        seriesLayoutBtn.addEventListener('click', activateSeriesLayout);
        console.log("Series layout button event listener added");  // 이벤트 리스너 등록 확인용
    } else {
        console.error("Series layout button not found in the DOM.");
    }
};

document.addEventListener('DOMContentLoaded', () => {
    
    let seriesKeys = ["1", "2", "3"];
    const urlParams = new URLSearchParams(window.location.search);
    const urlSeriesKeys = urlParams.get('seriesKeys') ? urlParams.get('seriesKeys').split(',') : [];

    if (urlSeriesKeys.length > 0) {
        seriesKeys = urlSeriesKeys;
    }

    if (seriesKeys.length === 0) {
        console.error('시리즈 키가 정의되지 않았거나 빈 배열입니다.');
        return;
    }

    console.log('사용할 시리즈 키 리스트:', seriesKeys);

    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;
    cornerstoneWADOImageLoader.configure({ useWebWorkers: true });

    const element = document.getElementById('dicomImage');
    if (!element) {
        console.error("Element with ID 'dicomImage' not found.");
        return;
    }
    cornerstone.enable(element);

    const seriesLayoutBtn = document.getElementById('seriesLayoutBtn');
    const seriesDropdown = document.getElementById('seriesDropdown');
    
    seriesLayoutBtn?.addEventListener('click', () => {
        seriesDropdown.style.display = seriesDropdown.style.display === 'block' ? 'none' : 'block';
    });

    const gridContainer = document.getElementById('dicomImage');
    if (!gridContainer) {
        console.error("Element with ID 'dicomImage' not found.");
        return;
    }

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
                
                fetchImagesAndGenerateLayout(selectedRows, selectedCols);
                seriesDropdown.style.display = 'none';
                resetGridSelection();
            });

            gridSelector.appendChild(gridOption);
        }
    }

    function highlightGridSelection(rows, cols) {
        const gridItems = document.querySelectorAll('.grid-option');
        gridItems.forEach(item => {
            const itemRow = parseInt(item.dataset.row);
            const itemCol = parseInt(item.dataset.col);
            item.classList.toggle('selected', itemRow <= rows && itemCol <= cols);
        });
    }

    function resetGridSelection() {
        document.querySelectorAll('.grid-option').forEach(item => item.classList.remove('selected'));
    }

    async function fetchImagesAndGenerateLayout(rows, cols) {
        try {
            const response = await fetch(`/studies/2/series-images?seriesKeys=${seriesKeys.join(',')}`);
            const seriesImagesMap = await response.json();
            generateSeriesLayout(rows, cols, seriesImagesMap);
        } catch (error) {
            console.error('Error fetching series images:', error);
        }
    }

    function generateSeriesLayout(rows, cols, seriesImagesMap) {
        gridContainer.innerHTML = '';
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        const totalCells = rows * cols;

        // 각 시리즈 키별 이미지를 순서대로 배치
        seriesKeys.slice(0, totalCells).forEach((seriesKey, index) => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridContainer.appendChild(gridItem);

            cornerstone.enable(gridItem);

            const imagePaths = seriesImagesMap[seriesKey];
            if (imagePaths && imagePaths.length > 0) {
                const imageId = `wadouri:http://localhost:8080/dicom-file/${imagePaths[0]}`;  // 각 시리즈의 첫 번째 이미지 로드
                
                console.log(`Loading image for seriesKey ${seriesKey}, imageId: ${imageId}`);

                cornerstone.loadImage(imageId).then(image => {
                    cornerstone.displayImage(gridItem, image);
                }).catch(err => {
                    console.error(`이미지 로드 실패 (seriesKey ${seriesKey}):`, err);
                });
            } else {
                gridItem.style.backgroundColor = 'black';
            }
        });
    }

    fetchImagesAndGenerateLayout(1, 1); // 초기 1x1 레이아웃 설정
});




/*document.addEventListener('DOMContentLoaded', () => {
    let seriesKeys = ["1", "2", "3"];
    const urlParams = new URLSearchParams(window.location.search);
    const urlSeriesKeys = urlParams.get('seriesKeys') ? urlParams.get('seriesKeys').split(',') : [];

    if (urlSeriesKeys.length > 0) {
        seriesKeys = urlSeriesKeys;
    }

    if (seriesKeys.length === 0) {
        console.error('시리즈 키가 정의되지 않았거나 빈 배열입니다.');
        return;
    }

    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;
    cornerstoneWADOImageLoader.configure({ useWebWorkers: true });

    const gridContainer = document.getElementById('dicomImage');
    const seriesLayoutBtn = document.getElementById('seriesLayoutBtn');
    const seriesDropdown = document.getElementById('seriesDropdown');
    const gridSelector = document.getElementById('seriesGridSelector');

    if (!gridContainer || !seriesLayoutBtn || !seriesDropdown || !gridSelector) {
        console.error("필요한 DOM 요소가 누락되었습니다.");
        return;
    }

    const seriesImageIndex = {}; // 각 시리즈의 현재 이미지 인덱스 추적

    // 시리즈 레이아웃 버튼 클릭 시 드롭다운 표시
    seriesLayoutBtn.addEventListener('click', () => {
        seriesDropdown.style.display = seriesDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // 그리드 선택 UI 생성 (5x5)
    for (let row = 1; row <= 5; row++) {
        for (let col = 1; col <= 5; col++) {
            const gridOption = document.createElement('div');
            gridOption.classList.add('grid-option');
            gridOption.dataset.row = row;
            gridOption.dataset.col = col;

            // 마우스 오버 시 선택 셀 강조 표시
            gridOption.addEventListener('mouseover', function () {
                highlightGridSelection(row, col);
            });

            // 클릭 시 선택한 행과 열로 시리즈 레이아웃 생성
            gridOption.addEventListener('click', function () {
                const selectedRows = parseInt(gridOption.dataset.row);
                const selectedCols = parseInt(gridOption.dataset.col);
                fetchImagesAndGenerateLayout(selectedRows, selectedCols);
                seriesDropdown.style.display = 'none';
                resetGridSelection();
            });

            gridSelector.appendChild(gridOption);
        }
    }

    function highlightGridSelection(rows, cols) {
        const gridItems = document.querySelectorAll('.grid-option');
        gridItems.forEach(item => {
            const itemRow = parseInt(item.dataset.row);
            const itemCol = parseInt(item.dataset.col);
            item.classList.toggle('selected', itemRow <= rows && itemCol <= cols);
        });
    }

    function resetGridSelection() {
        document.querySelectorAll('.grid-option').forEach(item => item.classList.remove('selected'));
    }

    async function fetchImagesAndGenerateLayout(rows, cols) {
        try {
            const response = await fetch(`/studies/2/series-images?seriesKeys=${seriesKeys.join(',')}`);
            const imagePathsMap = await response.json();
            generateSeriesLayout(rows, cols, imagePathsMap);
        } catch (error) {
            console.error('시리즈 이미지 가져오기 오류:', error);
        }
    }

    function generateSeriesLayout(rows, cols, imagePathsMap) {
        gridContainer.innerHTML = '';
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        seriesKeys.forEach((seriesKey, i) => {
            const imagePaths = imagePathsMap[seriesKey];
            if (!imagePaths || imagePaths.length === 0) return;

            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridContainer.appendChild(gridItem);
            cornerstone.enable(gridItem);

            seriesImageIndex[seriesKey] = 0; // 각 시리즈의 초기 이미지 인덱스 설정

            loadAndDisplayImage(gridItem, imagePaths, seriesKey);

            // 마우스 휠 이벤트 리스너 추가 - 선택된 셀에서만 이미지 전환
            gridItem.addEventListener('wheel', (event) => {
                event.preventDefault();
                seriesImageIndex[seriesKey] += (event.deltaY > 0 ? 1 : -1);

                // 인덱스가 범위를 벗어나지 않도록 처리
                if (seriesImageIndex[seriesKey] < 0) {
                    seriesImageIndex[seriesKey] = imagePaths.length - 1;
                } else if (seriesImageIndex[seriesKey] >= imagePaths.length) {
                    seriesImageIndex[seriesKey] = 0;
                }

                loadAndDisplayImage(gridItem, imagePaths, seriesKey);
            });
        });
    }

    function loadAndDisplayImage(gridItem, imagePaths, seriesKey) {
        const imageIndex = seriesImageIndex[seriesKey];
        const imageId = `wadouri:http://localhost:8080/dicom-file/${imagePaths[imageIndex]}`;

        cornerstone.loadImage(imageId).then((image) => {
            cornerstone.displayImage(gridItem, image);
        }).catch(err => {
            console.error(`Failed to load image (seriesKey: ${seriesKey}):`, err);
        });
    }

    fetchImagesAndGenerateLayout(1, 1); // 기본 1x1 레이아웃 설정
});
*/