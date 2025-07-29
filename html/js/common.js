// =========================
// UTILITY FUNCTIONS
// =========================

// DOM 유틸리티 - 안전한 element 선택
const safeQuerySelector = (selector, context = document) => {
    try {
        return context.querySelector(selector);
    } catch (error) {
        console.warn(`Invalid selector: ${selector}`, error);
        return null;
    }
};

const safeQuerySelectorAll = (selector, context = document) => {
    try {
        return context.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Invalid selector: ${selector}`, error);
        return [];
    }
};

// 클래스 조작 유틸리티
const toggleClass = (elements, className, force = undefined) => {
    if (!elements) return;
    
    const elementsArray = Array.isArray(elements) ? elements : [elements];
    elementsArray.forEach(el => {
        if (el && el.classList) {
            if (force !== undefined) {
                el.classList.toggle(className, force);
            } else {
                el.classList.toggle(className);
            }
        }
    });
};

const addClass = (elements, className) => {
    toggleClass(elements, className, true);
};

const removeClass = (elements, className) => {
    toggleClass(elements, className, false);
};

// 이벤트 리스너 유틸리티
const addEventListeners = (elements, event, handler, options = {}) => {
    if (!elements || !handler) return;
    
    const elementsArray = Array.isArray(elements) ? elements : 
                        elements.length !== undefined ? Array.from(elements) : [elements];
    
    elementsArray.forEach(el => {
        if (el && typeof el.addEventListener === 'function') {
            el.addEventListener(event, handler, options);
        }
    });
};

// 메뉴 상태 관리 유틸리티
const resetMenuStates = (menuSelector, activeClass = 'is-active') => {
    const menus = safeQuerySelectorAll(menuSelector);
    menus.forEach(menu => {
        removeClass(menu, activeClass);
        const subMenu = menu.querySelector('.gnb-sub-list');
        if (subMenu) {
            removeClass(subMenu, activeClass);
        }
    });
};

// 조건부 실행 유틸리티
const executeIfExists = (selector, callback) => {
    const element = safeQuerySelector(selector);
    if (element && typeof callback === 'function') {
        return callback(element);
    }
    return null;
};

// =========================
// ORIGINAL FUNCTIONS (REFACTORED)
// =========================

//toggle button
const setupDropdowns = () => {
    const toggleTriggers = safeQuerySelectorAll('.dropdown-wrap button');
    
    addEventListeners(toggleTriggers, 'click', (event) => {
        const button = event.currentTarget;
        toggleClass(button, 'is-active');
        
        if (button.nextElementSibling) {
            toggleClass(button.nextElementSibling, 'is-open');
        }
    });
}

// dropdown list 
const dropdownList = () => {
    const dropdownLists = safeQuerySelectorAll('.dropdown-list li button'); 
    
    addEventListeners(dropdownLists, 'click', (event) => {
        const button = event.currentTarget;
        const listData = button.innerHTML;
        const dropdownWrap = button.closest('.dropdown-wrap');
        
        if (dropdownWrap) {
            const selectBtn = dropdownWrap.querySelector('.btn-resume-select');
            const dropdownListEl = dropdownWrap.querySelector('.dropdown-list');
            
            if (selectBtn) {
                selectBtn.innerHTML = listData;
                removeClass(selectBtn, 'is-active');
            }
            if (dropdownListEl) {
                removeClass(dropdownListEl, 'is-open');
            }
        }
    });
}

// footer copy
const copyDv = () => {
    if(window.innerWidth < 768) {
        const origin = safeQuerySelector('.footer-info .copy');
        const footerLink = safeQuerySelector('.footer-link');
        
        if (origin && footerLink) {
            addClass(origin, 'mt-0');
            footerLink.appendChild(origin.cloneNode(true));
            origin.remove();
        }
    }
}

//tab menu sort
const initTabs = (containerSelector, type) => {
    const containers = safeQuerySelectorAll(containerSelector);
    if (!containers.length) return;

    containers.forEach(container => {
        // 현재 컨테이너 내의 직접적인 탭 메뉴만 선택 (중첩 탭 방지)
        const tabMenuWrap = container.querySelector('.tab-menu-wrap');
        if (!tabMenuWrap) return;
        
        const tabMenus = tabMenuWrap.querySelectorAll('.tab-menu');
        const tabContents = container.querySelectorAll('.tab-content__wrap .tab-content');
        const scrollTab = container.querySelector('.scroll-tab');

        if (tabMenus.length === 0) return;

        const scrollActiveTabIntoView = () => {
            const activeTab = tabMenuWrap.querySelector('.tab-menu.is-active');
            if (activeTab && scrollTab && scrollTab.scrollWidth > scrollTab.clientWidth) {
                activeTab.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        };

        // 탭 클릭 이벤트 처리 (이벤트 위임 사용)
        tabMenuWrap.addEventListener('click', (event) => {
            // 클릭된 요소가 탭 메뉴인지 확인
            if (!event.target.classList.contains('tab-menu')) return;
            
            // 이벤트 버블링 방지 (중첩 탭 간섭 방지)
            event.stopPropagation();
            
            const clickedTab = event.target;
            
            // 현재 컨테이너의 탭 메뉴들에서만 active 클래스 제거/추가
            Array.from(tabMenus).forEach(tab => removeClass(tab, 'is-active'));
            addClass(clickedTab, 'is-active');

            // 탭 콘텐츠 처리 (type이 'sort'가 아닌 경우만)
            if (type !== 'sort' && tabContents.length > 0) {
                const targetId = clickedTab.getAttribute('data-tab');
                const targetContent = container.querySelector(`#${targetId}`);

                Array.from(tabContents).forEach(content => removeClass(content, 'is-active'));
                if (targetContent) {
                    addClass(targetContent, 'is-active');
                }
            }
            
            scrollActiveTabIntoView();
        });

        // 초기 스크롤 위치 설정
        scrollActiveTabIntoView();
    });
};

const tabMenu = (type = 'full') => {
    if (type === 'sort') {
        initTabs('.tab-container-sort', 'sort');
    } else {
        initTabs('.tab-container-full', 'full');
    }
};

// faq
const accordion = () => {
    const faqItems = safeQuerySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        if (questionButton) {
            questionButton.addEventListener('click', () => {
                toggleClass(item, 'is-active');
            });
        }
    });
}

// filters
const filtersSelect = () => {
    const filterLinks = safeQuerySelectorAll('.filter-option li a');

    addEventListeners(filterLinks, 'click', (event) => {
        event.preventDefault();
        
        const clickedLi = event.currentTarget.parentElement;
        const parentUl = clickedLi.parentElement;

        // 같은 그룹(ul) 내의 다른 li에서 is-active 클래스 제거
        const siblingLis = parentUl.querySelectorAll('li');
        removeClass(Array.from(siblingLis), 'is-active');
        
        // 클릭된 li에 is-active 클래스 추가
        addClass(clickedLi, 'is-active');
    });
}

//하트
const likeEvent = (selector) => {
    const likeButtons = safeQuerySelectorAll(selector);    
    
    addEventListeners(likeButtons, 'click', (event) => {
        toggleClass(event.currentTarget, 'is-active');
    });
}

// modal
const setModal = (target) => {
    const targetElement = typeof target === 'string' ? safeQuerySelector(`#${target}`) : target;
    if (!targetElement) return;
    
    targetElement.style.display = 'flex';

    setTimeout(() => {
        addClass(targetElement, 'is-active');   
        if (!document.body.classList.contains('modal-open')) {             
            addClass(document.body, 'modal-open');
        }
    }, 300);
}
window.setModal = setModal;

// 모달 열기
const openModal = (event, type) => {    
    event.preventDefault();
    const btn = event.currentTarget;
    const modalId = btn.getAttribute('modal-id');
    
    const target = safeQuerySelector(`#${modalId}`);
    if (target) {     
        setModal(modalId);
    }
};
window.openModal = openModal;

// 모달 외부 클릭 이벤트 핸들러
document.addEventListener("click", function(e) {      
    if (e.target.classList.contains('modal__wrap--bg')) {        
        setTimeout(() => {
            removeClass(e.target, 'is-active');
            removeClass(document.body, 'modal-open');     
        }, 300);         
        e.target.style.display = 'none';
    }
});

//모달창 닫기
const closeModal = (event, openButton) => {
    const btn = event.currentTarget;      
    const activeModal = btn.closest('.cmp-modal');  
    
    const totalModal = safeQuerySelectorAll('.cmp-modal.is-active');
    const modalLength = totalModal.length;

    if (activeModal) {
        removeClass(activeModal, 'is-active');
        
        if (modalLength <= 1) {     
            removeClass(document.body, 'modal-open');
            
            setTimeout(() => {
                activeModal.style.display = 'none';
            }, 300);
        }
    }
};
window.closeModal = closeModal;

const addCloseModalListeners = (target, openButton) => {
    const closeButtons = target.querySelectorAll('.close-modal');
    addEventListeners(closeButtons, 'click', (event) => closeModal(event, openButton));
};

// 모바일 버튼
const moButton = () => {
    executeIfExists('.btn-hambuger', (hamburger) => {
        hamburger.addEventListener('click', () => {
            const moGnb = safeQuerySelector('.gnb-area-full');
            if (moGnb) {
                addClass(moGnb, 'is-active');
                addClass(document.body, 'modal-open');
                const moGnbSubList = safeQuerySelectorAll('.gnb-list > li');
                moGnbSubList.forEach((item,index) => {
                    const moGnbSubList = item.innerHTML;                    
                    const newMoGnbWrap = document.createElement('div');
                    newMoGnbWrap.innerHTML = moGnbSubList;
                    newMoGnbWrap.classList.add('mo-gnb-list-item');
                    newMoGnbWrap.setAttribute('id', `mo-sub${index}`);
                    document.querySelector('.mo-gnb-sub-list').appendChild(newMoGnbWrap);
                    newMoGnbWrap.querySelectorAll('ul').forEach((item,index) => {
                        if(item.classList.contains('is-active')) {
                            item.classList.remove('is-active');
                        }
                        item.classList.remove('gnb-sub-list');
                    });
                    newMoGnbWrap.querySelectorAll('.font-body-style2').forEach((item,index) => {
                        item.addEventListener('click', (e) => {
                            e.preventDefault();
                            const targetId = item.getAttribute('href');
                            const targetElement = document.querySelector(targetId);
                            
                            if (targetElement) {
                                targetElement.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }
                        }); 
                    });
                })
            }
        });
    });
}

const moButtonClose = () => {
    executeIfExists('.btn-close-hamburger', (hamburger) => {
        hamburger.addEventListener('click', () => {
            const moGnb = safeQuerySelector('.gnb-area-full');
            if (moGnb) {
                removeClass(moGnb, 'is-active');
                removeClass(document.body, 'modal-open');
            }
        });
    });
}

// 파일첨부
function initializeFileInputs() {
    const fileInputs = safeQuerySelectorAll('.real-file-input');

    addEventListeners(fileInputs, 'change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            const wrapper = e.target.closest('.file-input-wrapper');
            const display = wrapper ? wrapper.querySelector('.display-file-name') : null;
            
            if (display) {
                display.value = fileName;
            }
        }
    });
}

let timer; // 타이머 변수를 함수 외부에 선언

const jobCardTitle = () => {
    const titleArea = safeQuerySelector('.box-type.job-title');
    if (!titleArea) return;
    
    const titleOffset = titleArea.offsetTop;

    if (window.scrollY > titleOffset) {
        addClass(titleArea, 'is-fixed');
    } else {
        removeClass(titleArea, 'is-fixed');
    }
};

//gnb nav
// gnb-sub-list 높이 설정 함수
const setGnbSubListHeight = () => {
    const gnbSubLists = safeQuerySelectorAll('.gnb-sub-list');
    if (!gnbSubLists.length) return;
    
    // 각 gnb-sub-list의 자식 li 개수를 구해서 최대값 찾기
    let maxChildren = 0;
    gnbSubLists.forEach(subList => {
        const childrenCount = subList.querySelectorAll('li').length;
        if (childrenCount > maxChildren) {
            maxChildren = childrenCount;
        }
    });
    
    // 최대 자식 개수 × 53px로 높이 계산
    const calculatedHeight = maxChildren * 53;
    
    // 모든 gnb-sub-list에 높이 적용
    gnbSubLists.forEach(subList => {
        subList.style.height = `${calculatedHeight}px`;
    });
}

const gnbMenu = () => {
    const gnbList = safeQuerySelector('.gnb-list');
    const gnbAreaFull = safeQuerySelector('.gnb-area-full');
    const gnbDimBg = safeQuerySelector('.gnb-dim-bg');
    
    if (!gnbList || !gnbAreaFull || !gnbDimBg) return;

    // 서브메뉴 열기 함수
    const openSubMenu = (target) => {
        if(window.innerWidth > 768) {
            addClass(gnbDimBg, 'is-active');
            gnbDimBg.style.top = `${target.offsetTop + 63}px`;
        }
        addClass(gnbList, 'is-active');
        
        const subLists = safeQuerySelectorAll('.gnb-sub-list');
        addClass(Array.from(subLists), 'is-active');
        
        // 검색창이 열려있으면 닫기
        const moSearchArea = safeQuerySelector('.mo-search-area');
        const searchItem = safeQuerySelector('.gnb-list li.search-item');
        if (moSearchArea && moSearchArea.classList.contains('is-active')) {
            removeClass(moSearchArea, 'is-active');
            if (searchItem) removeClass(searchItem, 'is-active');
        }
    };

    // 서브메뉴 닫기 함수 (검색창은 별도 처리)
    const closeSubMenu = () => {
        removeClass(gnbDimBg, 'is-active');
        removeClass(gnbList, 'is-active');
        
        const subLists = safeQuerySelectorAll('.gnb-sub-list');
        removeClass(Array.from(subLists), 'is-active');
    };

    // 검색창이 열려있는지 확인하는 함수
    const isSearchActive = () => {
        const moSearchArea = safeQuerySelector('.mo-search-area');
        return moSearchArea && moSearchArea.classList.contains('is-active');
    };

    // 마우스가 검색 영역에 있는지 확인하는 함수
    const isMouseInSearchArea = (event) => {
        const moSearchArea = safeQuerySelector('.mo-search-area');
        const searchItem = safeQuerySelector('.gnb-list li.search-item');
        
        if (!moSearchArea || !searchItem) return false;
        
        // 검색 버튼과 검색 레이어의 경계 상자를 확인
        const searchRect = moSearchArea.getBoundingClientRect();
        const buttonRect = searchItem.getBoundingClientRect();
        
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        
        // 검색 레이어 영역 또는 검색 버튼 영역에 마우스가 있는지 확인
        const inSearchArea = (mouseX >= searchRect.left && mouseX <= searchRect.right && 
                            mouseY >= searchRect.top && mouseY <= searchRect.bottom);
        const inButtonArea = (mouseX >= buttonRect.left && mouseX <= buttonRect.right && 
                            mouseY >= buttonRect.top && mouseY <= buttonRect.bottom);
        
        return inSearchArea || inButtonArea;
    };

    // 각 GNB 메뉴 항목에 이벤트 추가
    const gnbItems = gnbList.querySelectorAll('li');
    gnbItems.forEach(item => {
        const subMenu = item.querySelector('.gnb-sub-list');
        if (subMenu) {
            addEventListeners([item], 'mouseenter', () => {
                openSubMenu(item);
            });
            
            addEventListeners([item], 'focusin', () => {
                openSubMenu(item);
            });
        }
    });

    // GNB 영역에서 마우스가 벗어날 때 처리
    addEventListeners([gnbAreaFull], 'mouseleave', (event) => {
        // 검색창이 열려있고 마우스가 검색 영역으로 이동하는 경우 서브메뉴만 닫기
        if (isSearchActive() && isMouseInSearchArea(event)) {
            closeSubMenu(); // 서브메뉴만 닫고 검색창은 유지
            return;
        }
        
        // 일반적인 경우 모든 메뉴 닫기
        closeSubMenu();
        if (isSearchActive()) {
            executeIfExists('.btn-close-search', (btn) => btn.click());
        }
    });

    // Dim 배경에서 마우스가 벗어날 때
    addEventListeners([gnbDimBg], 'mouseleave', (event) => {
        // 검색창이 열려있는 경우 검색 영역 확인
        if (isSearchActive() && isMouseInSearchArea(event)) {
            return; // 검색 영역으로 이동하는 경우 아무것도 하지 않음
        }
        closeSubMenu();
    });
}

const gnbSearch = () => {
    executeIfExists('.gnb-list li.search-item button', (gnbSearchBtn) => {
        gnbSearchBtn.addEventListener('click', () => {
            // gnb가 열려있는 상태면 닫기
            const gnbList = safeQuerySelector('.gnb-list');
            const gnbDimBg = safeQuerySelector('.gnb-dim-bg');
            
            if (gnbList && gnbList.classList.contains('is-active')) {
                removeClass(gnbDimBg, 'is-active');
                removeClass(gnbList, 'is-active');
                const subLists = safeQuerySelectorAll('.gnb-sub-list');
                removeClass(Array.from(subLists), 'is-active');
            }
            
            // 검색창 열기/닫기 토글
            toggleClass(gnbSearchBtn.parentElement, 'is-active');
            const moSearchArea = safeQuerySelector('.mo-search-area');
            if (moSearchArea) {
                toggleClass(moSearchArea, 'is-active');
                
                // 검색창이 열린 후 검색 입력 필드에 포커스
                if (moSearchArea.classList.contains('is-active')) {
                    setTimeout(() => {
                        const searchInput = moSearchArea.querySelector('input');
                        if (searchInput) {
                            searchInput.focus();
                        }
                    }, 100);
                }
            }
        });
    });

    // 검색 레이어에 마우스 이벤트 추가
    executeIfExists('.mo-search-area', (moSearchArea) => {
        // 검색 레이어에서 마우스가 벗어날 때 일정 시간 후 검색창 닫기
        let searchCloseTimer = null;

        moSearchArea.addEventListener('mouseleave', (event) => {
            // PC 모드에서만 적용
            if (window.innerWidth > 768) {
                const searchItem = safeQuerySelector('.gnb-list li.search-item');
                const gnbAreaFull = safeQuerySelector('.gnb-area-full');
                
                // 마우스가 검색 버튼이나 GNB 영역으로 돌아가는지 확인
                const relatedTarget = event.relatedTarget;
                if (relatedTarget && (
                    searchItem?.contains(relatedTarget) || 
                    gnbAreaFull?.contains(relatedTarget)
                )) {
                    return; // 관련 영역으로 이동하는 경우 닫지 않음
                }

                // 300ms 지연 후 검색창 닫기
                /* 검색창 자동으로 닫히지 않게 처리해달라고함. 
                searchCloseTimer = setTimeout(() => {
                    if (moSearchArea.classList.contains('is-active')) {
                        removeClass(moSearchArea, 'is-active');
                        const searchItem = safeQuerySelector('.gnb-list li.search-item');
                        if (searchItem) removeClass(searchItem, 'is-active');
                    }
                }, 300);
                */
            }
        });

        // 검색 레이어에 마우스가 들어오면 타이머 취소
        moSearchArea.addEventListener('mouseenter', () => {
            if (searchCloseTimer) {
                clearTimeout(searchCloseTimer);
                searchCloseTimer = null;
            }
        });

        // 검색 입력 필드에서 ESC 키 처리
        const searchInput = moSearchArea.querySelector('input');
        if (searchInput) {
            searchInput.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    executeIfExists('.btn-close-search', (btn) => btn.click());
                }
            });
        }
    });

    // 문서 전체에서 클릭 이벤트 처리 (검색창 외부 클릭 시 닫기)
    document.addEventListener('click', (event) => {
        const moSearchArea = safeQuerySelector('.mo-search-area');
        const searchItem = safeQuerySelector('.gnb-list li.search-item');
        
        if (moSearchArea && moSearchArea.classList.contains('is-active')) {
            // 클릭된 요소가 검색 관련 요소가 아닌 경우 검색창 닫기
            if (!moSearchArea.contains(event.target) && 
                !searchItem?.contains(event.target)) {
                removeClass(moSearchArea, 'is-active');
                if (searchItem) removeClass(searchItem, 'is-active');
            }
        }
    }, { capture: true });
}

const moSearchClose = () => {
    executeIfExists('.btn-close-search', (moSearchCloseBtn) => {
        moSearchCloseBtn.addEventListener('click', () => {
            const moSearchArea = safeQuerySelector('.mo-search-area');
            const searchItem = safeQuerySelector('.gnb-list li.search-item');
            
            if (moSearchArea) {
                removeClass(moSearchArea, 'is-active');
                // 검색 입력 필드 내용 초기화 (선택사항)
                const searchInput = moSearchArea.querySelector('input');
                if (searchInput) {
                    searchInput.value = '';
                    searchInput.blur(); // 포커스 제거
                }
            }
            if (searchItem) removeClass(searchItem, 'is-active');
        });
    });
}

const moGnb = () => {
    const moGnbList = safeQuerySelectorAll('.gnb-list li a');
    if (!moGnbList.length) return;
    
    // 첫 번째 메뉴의 하위메뉴를 기본적으로 열린 상태로 설정
    executeIfExists('.gnb-list li:first-child', (firstMenuItem) => {
        addClass(firstMenuItem, 'is-active');
        // const firstSubMenu = firstMenuItem.querySelector('.gnb-sub-list');
        // if (firstSubMenu) {
        //     addClass(firstSubMenu, 'is-active');
        // }
    });
    
    addEventListeners(moGnbList, 'click', (event) => {
        // 모든 메뉴의 is-active 클래스 제거
        resetMenuStates('.gnb-list li');
        event.preventDefault();
        // 클릭한 메뉴만 활성화
        const clickedItem = event.currentTarget.parentElement;
        console.log(clickedItem);
        addClass(clickedItem, 'is-active');
        
        const targetId = event.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// 07.28 cy - mobile 전체메뉴 스크롤시 좌측 gnb영역 active 추가&제거
const subListScroll = () => {
    const subListArea = document.querySelector('.mo-gnb-sub-list');
    if (!subListArea) return;

    subListArea.addEventListener('scroll', () => {
        const targetItems = subListArea.querySelectorAll(".mo-gnb-list-item");
        const gnbLinks = document.querySelectorAll(".gnb-list > li > a");
        const scrollTop = subListArea.scrollTop;
        let closestIdx = 0;
        let minDistance = Infinity;

      // 현재 스크롤 위치에 가장 가까운 item 찾기
        targetItems.forEach((el, idx) => {
            const distance = Math.abs(el.offsetTop - scrollTop);
            if (distance < minDistance) {
                console.log(minDistance)
                minDistance = distance;
                closestIdx = idx;
            }
        });

        // 기존 active 제거
        document.querySelectorAll(".gnb-list > li").forEach(li => li.classList.remove("is-active"));

        // 가장 가까운 항목에 active 추가
        const targetLi = gnbLinks[closestIdx]?.closest("li");
        if (targetLi) {
            targetLi.classList.add("is-active");
        }
    });
};

// 스크롤 이벤트에 쓰로틀링 적용
window.addEventListener('scroll', () => {
    if (!timer) {
        timer = setTimeout(() => {
            timer = null;
            jobCardTitle();
        }, 100);
    }
});

window.addEventListener('resize', () => {
    copyDv();
    jobCardTitle();
    
    if (window.innerWidth > 768) {
        // PC 모드로 전환 시 모바일 GNB 클래스 제거
        resetMenuStates('.gnb-list li');
        gnbMenu();
        setGnbSubListHeight();
        gnbSearch();
        moSearchClose();
    }
    if (window.innerWidth < 768) {
        moGnb();
        subListScroll();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    setupDropdowns();
    copyDv();
    tabMenu('sort');
    tabMenu('full');
    accordion();
    filtersSelect();
    initializeFileInputs();
    likeEvent('.like-button');
    moButton();
    moButtonClose();
    dropdownList();
    
    if (window.innerWidth > 768) {
        gnbMenu();
        setGnbSubListHeight();
        gnbSearch();
        moSearchClose();
    }
    if (window.innerWidth < 768) {
        moGnb();
        subListScroll();
    }
});