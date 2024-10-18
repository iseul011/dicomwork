document.addEventListener('DOMContentLoaded', () => {
    const seriesKeys = [/* 각 시리즈의 key를 여기에 넣습니다. */];
    let currentIndex = 0;
    let gridSize = { rows: 1, cols: 1 };

    // 시리즈 레이아웃 버튼 클릭 시 드롭다운 토글
    document.getElementById('seriesLayoutBtn').addEventListener('click', () => {
        const dropdown = document.getElementById('seriesDropdown');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    // 그리드 레이아웃 생성 및 시리즈 이미지 로드
    function generateSeriesLayout(rows, cols) {
        gridSize = { rows, cols };
        const gridContainer = document.getElementById('seriesGrid');
        gridContainer.innerHTML = '';  // 기존 그리드를 초기화

        // 그리드 설정
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        // 각 시리즈의 첫 번째 이미지 로드
        for (let i = 0; i < rows * cols; i++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridContainer.appendChild(gridItem);

            if (i < seriesKeys.length) {
                // 각 시리즈의 첫 번째 이미지 로드
                const seriesKey = seriesKeys[i];
                const imageId = `wadouri:http://localhost:8080/dicom-file/${seriesKey}/first-image`;  // 예시 URL

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
                // 시리즈가 없을 경우 검은 배경 적용
                gridItem.style.backgroundColor = 'black';
            }
        }
    }

    // 레이아웃 선택 및 적용
    const layoutSelector = document.getElementById('seriesGridSelector');
    for (let row = 1; row <= 5; row++) {
        for (let col = 1; col <= 5; col++) {
            const gridOption = document.createElement('div');
            gridOption.classList.add('grid-option');
            gridOption.dataset.row = row;
            gridOption.dataset.col = col;
            
            // 레이아웃 옵션 선택 시 그리드 생성
            gridOption.addEventListener('click', function () {
                const selectedRows = parseInt(gridOption.dataset.row);
                const selectedCols = parseInt(gridOption.dataset.col);
                generateSeriesLayout(selectedRows, selectedCols);

                // 선택 후 드롭다운 닫기
                document.getElementById('seriesDropdown').style.display = 'none';
            });

            layoutSelector.appendChild(gridOption);
        }
    }
});
