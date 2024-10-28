// 이미지 레이아웃 초기화 함수
function initializeImageLayout() {
    function activateImageLayout() {
        document.getElementById('dropdown').style.display = 'block';
        document.getElementById('seriesDropdown').style.display = 'none';
        document.getElementById('imgLayoutBtn').disabled = false;
    }

    document.getElementById('imgLayoutBtn').addEventListener('click', activateImageLayout);

    console.log("Image Layout Initialized");
}

// URL에서 seriesKey를 가져오는 함수
function getSeriesKeyFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('seriesKey');
}

// 특정 seriesKey에 해당하는 첫 번째 이미지를 로드하는 함수
async function loadFirstImageForSeries(seriesKey) {
    try {
        const response = await fetch(`/studies/${studyKey}/series/${seriesKey}/images`);
        const images = await response.json();
        
        if (images && images.length > 0) {
            const firstImagePath = images[0];
            const imageId = `wadouri:http://localhost:8080/dicom-file/${firstImagePath}`;
            cornerstone.loadImage(imageId).then(image => {
                cornerstone.displayImage(document.getElementById('dicomImage'), image);
            }).catch(err => {
                console.error('Failed to load the first image:', err);
            });
        } else {
            console.error('No images found for the selected series');
        }
    } catch (error) {
        console.error('Error fetching images for series:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // cornerstone 초기화
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;

    const element = document.getElementById('dicomImage');
    cornerstone.enable(element);
    
    // URL에서 seriesKey 가져오기
    const seriesKey = getSeriesKeyFromURL();
    if (seriesKey) {
        loadFirstImageForSeries(seriesKey);
    } else {
        console.error('Series key not found in URL');
    }

    let currentIndex = 0;  // 현재 이미지 인덱스 초기화
    const totalImages = imagePaths.length;  // 전체 이미지 개수
    let gridSize = { rows: 1, cols: 1 };  // 그리드 사이즈 정보
    
    // loadAndDisplayImage 함수 정의 (또는 기존 함수를 대체)
    function loadAndDisplayImage(filename) {
        if (!filename) {
            console.error("Invalid filename:", filename);
            return;  // filename이 유효하지 않으면 함수를 종료
        }

        const imageId = `wadouri:http://localhost:8080/dicom-file/${filename}`;
        console.log("Loading imageId:", imageId);

        cornerstone.loadImage(imageId).then(image => {
            cornerstone.displayImage(element, image);
        }).catch(err => {
            console.error('이미지 로드 실패:', err);
        });
    }

    // 첫 번째 이미지를 로드
    if (totalImages > 0) {
        loadAndDisplayImage(imagePaths[currentIndex]);
    }

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
            gridItem.style.width = '100%';
            gridItem.style.height = '100%';
            gridContainer.appendChild(gridItem);

            cornerstone.enable(gridItem);

            if (i < totalImages) {
                const imageId = `wadouri:http://localhost:8080/dicom-file/${imagePaths[(currentIndex + i) % totalImages]}`;
                console.log("이미지 로드 경로:", imageId);

                cornerstone.loadImage(imageId).then(image => {
                    cornerstone.displayImage(gridItem, image);
                }).catch(err => {
                    console.error('이미지 로드 실패:', err);
                });
            } else {
                gridItem.style.backgroundColor = 'black';
            }
        }
    }

    // 다음 이미지를 로드하는 함수
    function loadNextImages() {
        if (currentIndex + gridSize.rows * gridSize.cols < totalImages) {
            currentIndex = (currentIndex + gridSize.rows * gridSize.cols) % totalImages;
            generateImageGrid(gridSize.rows, gridSize.cols);
        }
    }

    // 이전 이미지를 로드하는 함수
    function loadPrevImages() {
        if (currentIndex - gridSize.rows * gridSize.cols >= 0) {
            currentIndex = (currentIndex - gridSize.rows * gridSize.cols + totalImages) % totalImages;
            generateImageGrid(gridSize.rows, gridSize.cols);
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

            gridItem.addEventListener('mouseover', function () {
                highlightGridSelection(i, j);
            });

            gridItem.addEventListener('click', function () {
                const rows = parseInt(gridItem.dataset.row);
                const cols = parseInt(gridItem.dataset.col);
                generateImageGrid(rows, cols);
                document.getElementById('dropdown').style.display = 'none';
                resetGridSelection();
            });

            gridSelector.appendChild(gridItem);
        }
    }

    function highlightGridSelection(rows, cols) {
        const gridItems = document.querySelectorAll('.grid-selector-item');
        gridItems.forEach(item => {
            const itemRow = parseInt(item.dataset.row);
            const itemCol = parseInt(item.dataset.col);
            item.classList.toggle('selected', itemRow <= rows && itemCol <= cols);
        });
    }

    function resetGridSelection() {
        document.querySelectorAll('.grid-selector-item').forEach(item => item.classList.remove('selected'));
    }

    // 기본 1x1 그리드로 시작
    generateImageGrid(1, 1);

    // 이미지 전환 기능 추가
	element.addEventListener('wheel', (event) => {
	    event.preventDefault();
	    console.log('deltaY:', event.deltaY);
	
	    if (event.deltaY > 0) {
	        currentIndex = (currentIndex + 1) % totalImages;
	    } else {
	        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
	    }
	
	    const nextImagePath = imagePaths[currentIndex];
	    loadAndDisplayImage(nextImagePath);
	});
});
