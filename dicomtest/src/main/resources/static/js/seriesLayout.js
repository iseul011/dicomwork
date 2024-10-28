// 시리즈 레이아웃 초기화 함수
// 시리즈 레이아웃 버튼을 클릭했을 때 드롭다운을 표시하거나 숨기는 함수입니다.
function initializeSeriesLayout() {
    const seriesLayoutBtn = document.getElementById('seriesLayoutBtn');
    const seriesDropdown = document.getElementById('seriesDropdown');

    function toggleSeriesDropdown() {
        seriesDropdown.style.display = seriesDropdown.style.display === 'block' ? 'none' : 'block';
        console.log("Series Layout Dropdown Toggled");
    }

    // 시리즈 레이아웃 버튼에 클릭 이벤트 추가 - 드롭다운을 클릭 시 토글
    if (seriesLayoutBtn) {
        // HTML에서 onclick 이벤트 제거 후 여기에 클릭 이벤트 리스너 추가
        seriesLayoutBtn.addEventListener('click', toggleSeriesDropdown);
    }

    console.log("Series Layout Initialized");
}

// 초기화 함수 호출
/*initializeSeriesLayout();*/

// 페이지가 로드될 때 한 번만 호출되도록 조치
document.addEventListener('DOMContentLoaded', () => {
    initializeSeriesLayout();
});

// 전역 변수 설정
let seriesKeys = ["1", "2", "3"];
const urlParams = new URLSearchParams(window.location.search);
const urlSeriesKeys = urlParams.get('seriesKeys') ? urlParams.get('seriesKeys').split(',') : [];

// 행과 열을 선택한 후 시리즈 레이아웃 적용 및 이미지 레이아웃 버튼 비활성화
function applySeriesGridLayout(rows, cols) {
    fetchImagesAndGenerateLayout(rows, cols);

    // 이미지 레이아웃 버튼 비활성화
    const imgLayoutBtn = document.getElementById('imgLayoutBtn');
    if (imgLayoutBtn) {
        imgLayoutBtn.disabled = true;
    }

    document.getElementById('seriesDropdown').style.display = 'none';
    resetGridSelection();
    console.log(`Series Grid Layout applied with ${rows} rows and ${cols} columns`);
}

// 드롭다운에서 선택된 행과 열로 레이아웃을 적용하기 위한 그리드 생성
const gridSelector = document.getElementById('seriesGridSelector');
for (let row = 1; row <= 5; row++) {
    for (let col = 1; col <= 5; col++) {
        const gridOption = document.createElement('div');
        gridOption.classList.add('grid-option');
        gridOption.dataset.row = row;
        gridOption.dataset.col = col;

        // 그리드 옵션에 호버 기능 추가
        gridOption.addEventListener('mouseover', function () {
            highlightGridSelection(row, col);
        });

        // 그리드 옵션 클릭 시 선택한 행과 열로 시리즈 레이아웃 생성
        gridOption.addEventListener('click', function () {
            const selectedRows = parseInt(gridOption.dataset.row);
            const selectedCols = parseInt(gridOption.dataset.col);
            applySeriesGridLayout(selectedRows, selectedCols);
        });

        gridSelector.appendChild(gridOption);
    }
}

// 선택된 그리드 강조 표시 함수
function highlightGridSelection(rows, cols) {
    const gridItems = document.querySelectorAll('.grid-option');
    gridItems.forEach(item => {
        const itemRow = parseInt(item.dataset.row);
        const itemCol = parseInt(item.dataset.col);
        item.classList.toggle('selected', itemRow <= rows && itemCol <= cols);
    });
}

// 그리드 선택 초기화
function resetGridSelection() {
    document.querySelectorAll('.grid-option').forEach(item => item.classList.remove('selected'));
}

// 시리즈 이미지 레이아웃 생성 함수
async function fetchImagesAndGenerateLayout(rows, cols) {
    try {
        if (!Array.isArray(seriesKeys) || seriesKeys.length === 0) {
            throw new Error("seriesKeys가 정의되지 않았거나 빈 배열입니다.");
        }

        const response = await fetch(`/studies/2/series-images?seriesKeys=${seriesKeys.join(',')}`);
        
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        
        const seriesImagesMap = await response.json();
        console.log("Fetched series images map:", seriesImagesMap);
        
        generateSeriesLayout(rows, cols, seriesImagesMap);
    } catch (error) {
        console.error('Error fetching series images:', error);
    }
}

// 시리즈 레이아웃 생성 함수
function generateSeriesLayout(rows, cols, seriesImagesMap) {
    const gridContainer = document.getElementById('dicomImage');
    gridContainer.innerHTML = '';
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    const totalCells = rows * cols;
    const seriesImageIndex = {}; 

    seriesKeys.slice(0, totalCells).forEach((seriesKey, index) => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridContainer.appendChild(gridItem);

        cornerstone.enable(gridItem);

        const imagePaths = seriesImagesMap[seriesKey];
        if (imagePaths && imagePaths.length > 0) {
            seriesImageIndex[seriesKey] = 0;
            loadAndDisplayImage(gridItem, imagePaths[seriesImageIndex[seriesKey]], seriesKey);

            // 휠 이벤트 리스너 추가 - 스크롤로 이미지 전환
            gridItem.addEventListener('wheel', (event) => {
                event.preventDefault();

                if (event.deltaY > 0) {
                    seriesImageIndex[seriesKey] = (seriesImageIndex[seriesKey] + 1) % imagePaths.length;
                } else {
                    seriesImageIndex[seriesKey] = (seriesImageIndex[seriesKey] - 1 + imagePaths.length) % imagePaths.length;
                }

                const nextImagePath = imagePaths[seriesImageIndex[seriesKey]];
                loadAndDisplayImage(gridItem, nextImagePath, seriesKey);
            });

            // 더블클릭 이벤트 리스너 추가 - 1x1 레이아웃 전환
            gridItem.addEventListener('dblclick', () => {
                applySingleSeriesLayout(seriesKey);
            });
        } else {
            gridItem.style.backgroundColor = 'black';
            console.warn(`No images found for seriesKey: ${seriesKey}. Cell will display black background.`);
        }
    });
}

// 셀에 이미지를 로드하고 표시하는 함수
function loadAndDisplayImage(gridItem, filename, seriesKey) {
    const imageId = `wadouri:http://localhost:8080/dicom-file/${filename}`;
    cornerstone.loadImage(imageId).then(image => {
        cornerstone.displayImage(gridItem, image);
        console.log(`Displayed image for seriesKey: ${seriesKey}, imageId: ${imageId}`);
    }).catch(err => {
        console.error(`Failed to load image for seriesKey ${seriesKey}:`, err);
    });
}

// 선택된 시리즈에 대해 1x1 레이아웃을 적용하는 함수
function applySingleSeriesLayout(seriesKey) {
    const gridContainer = document.getElementById('dicomImage');
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `1fr`;
    gridContainer.style.gridTemplateRows = `1fr`;

    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridContainer.appendChild(gridItem);
    cornerstone.enable(gridItem);

    // 해당 시리즈의 첫 번째 이미지 로드
    fetch(`/studies/2/series/${seriesKey}/images`)
	    .then(response => response.text()) // 응답을 텍스트로 읽기
	    .then(text => {
	        console.log('Response text:', text);
	        return JSON.parse(text); // JSON으로 파싱 시도 (오류가 발생할 수 있음)
	    })
	    .then(images => {
	        if (images && images.length > 0) {
	            loadAndDisplayImage(gridItem, images[0], seriesKey);
	        } else {
	            console.warn(`No images found for seriesKey: ${seriesKey}`);
	        }
	    })
	    .catch(error => console.error(`Error fetching images for series ${seriesKey}:`, error));

    // 이미지 레이아웃 버튼 활성화
    const imgLayoutBtn = document.getElementById('imgLayoutBtn');
    imgLayoutBtn.disabled = false;
    console.log(`Single series layout applied for seriesKey ${seriesKey} with 1x1 grid.`);
}
