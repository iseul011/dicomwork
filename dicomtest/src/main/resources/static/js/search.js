// 검색을 실행하고 URL 파라미터 없이 페이지를 새로고침
function searchStudies() {
    const searchType = document.getElementById("searchType").value;
    const searchValue = document.getElementById("searchValue").value;
    
    // 입력값이 없으면 경고를 띄우고 검색을 중단함
    if (!searchValue) {
        alert("검색어를 입력해주세요.");
        return;
    }

    // 검색을 실행하고, URL 파라미터 없이 페이지를 새로고침
    window.location.href = `/studies?searchType=${searchType}&searchValue=${searchValue}`;
}

// 모든 Study 목록을 보는 함수 추가
function showAllStudies() {
    window.location.href = "/studies";  // 모든 목록을 보여주는 URL로 이동
}
