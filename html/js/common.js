//toggle button
const setupDropdowns = () => {
    const toggleTriggers = document.querySelectorAll('.dropdown-wrap button');

    toggleTriggers.forEach(el => {
        el.addEventListener('click', () => {
        el.classList.toggle('is-active');

        if (el.nextElementSibling) {
            el.nextElementSibling.classList.toggle('is-open');
        }
        });
    });
}

// dropdown list 
const dropdownList = () => {
    const dropdownLists = document.querySelectorAll('.dropdown-list li button'); 
    if(!dropdownLists) {
        return;
    }
    dropdownLists.forEach(list=> {
        list.addEventListener('click', () => {
            const listData = list.innerHTML;
            list.closest('.dropdown-wrap').querySelector('.btn-resume-select').innerHTML = listData;
            list.closest('.dropdown-wrap').querySelector('.btn-resume-select').classList.remove('is-active');
            list.closest('.dropdown-list').classList.remove('is-open');
        })
    })
}


// footer copy
const copyDv = () => {
    if(window.innerWidth < 768) {
        const origin = document.querySelector('.footer-info .copy')
        origin && origin.classList.add('mt-0');
        document.querySelector('.footer-link') && document.querySelector('.footer-link').appendChild(origin.cloneNode(true));
        origin.remove();
    }
}

//tab menu sort
const initTabs = (containerSelector, type) => {
    const container = document.querySelector(containerSelector);
    if (!container) return; // Exit if container not found

    const tabMenus = container.querySelectorAll('.tab-menu');
    const tabContents = container.querySelectorAll('.tab-content__wrap .tab-content');
    const tabMenuWrap = container.querySelector('.scroll-tab');

    const scrollActiveTabIntoView = () => {
        const activeTab = container.querySelector('.tab-menu.is-active');
        if (activeTab && tabMenuWrap) {
            // Only scroll if the container is actually scrollable (on mobile)
            if (tabMenuWrap.scrollWidth > tabMenuWrap.clientWidth) {
                activeTab.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    };

    scrollActiveTabIntoView();

    tabMenus.forEach(tab => {
        tab.addEventListener('click', () => {
            // Step 1: Always handle the active state for the clicked tab menu.
            tabMenus.forEach(el => el.classList.remove('is-active'));
            tab.classList.add('is-active');

            // Step 2: Conditionally handle the content panels based on type.
            if (type !== 'sort') {
                const targetId = tab.getAttribute('data-tab');
                const targetContent = container.querySelector(`#${targetId}`);

                tabContents.forEach(el => el.classList.remove('is-active'));
                if (targetContent) {
                    targetContent.classList.add('is-active');
                }
            }
            scrollActiveTabIntoView();
        });
    });
};

const tabMenu = (type = 'full') => {
    if (type === 'sort') {
        // Initializes the tab system that only handles the active state of menus.
        initTabs('.tab-container-sort', 'sort');
    } else {
        // Initializes the full-featured tab system by default.
        initTabs('.tab-container-full', 'full');
    }
};
// faq
const accordion = () => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        questionButton.addEventListener('click', () => {
            const isActive = item.classList.contains('is-active');
            
            // Optional: Close all other items
            // faqItems.forEach(otherItem => {
            //     otherItem.classList.remove('is-active');
            // });

            // Toggle the clicked item
            if (!isActive) {
                item.classList.add('is-active');
            } else {
                item.classList.remove('is-active');
            }
        });
    });
}

// filters
const filtersSelect = () => {
    const filterLinks = document.querySelectorAll('.filter-option li a');

    filterLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            
            const clickedLi = link.parentElement;
            const parentUl = clickedLi.parentElement;

            // 같은 그룹(ul) 내의 다른 li에서 is-active 클래스 제거
            parentUl.querySelectorAll('li').forEach(siblingLi => {
                siblingLi.classList.remove('is-active');
            });
            
            // 클릭된 li에 is-active 클래스 추가
            clickedLi.classList.add('is-active');
        });
    });
}

//하트
const likeEvent = (el) => {
    const likeButtons = document.querySelectorAll(el);    
    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('is-active');
        })
    })
}

// modal
const setModal = (target) => { // target : 모달 아이디
    target = document.getElementById(target);
    target.style.display = 'flex';
    // if(target.classList.contains('type-bottom')) {
    //     const modalHeadHeight = target.querySelector('.modal-header') ? target.querySelector('.modal-header').offsetHeight : 0;
    //     const modalFootHeight = target.querySelector('.modal-footer') ? target.querySelector('.modal-footer').offsetHeight : 0;
    //     let modalHeight = modalHeadHeight + modalFootHeight + 50;
    //     target.querySelector('.modal-cont').style = `--modal-cont-height:${modalHeight}px`;
    // };


    setTimeout(() => {
        target.classList.add('is-active');   
        if(document.body.classList.contains('modal-open')) {
            return;
        }             
        document.body.classList.add('modal-open');
    }, 300);
}
window.setModal = setModal;
// / 모달 열기
const openModal = (event, type) => {    
    event.preventDefault();
    const btn = event.currentTarget;
    const modalId = btn.getAttribute('modal-id');
    
    const target = document.getElementById(modalId);

    if (target) {     
        setModal(modalId); // ID =`${modal-id}` 에 해당되는 모달 열기
    }
};
window.openModal = openModal;
// 모달 외부 클릭 이벤트 핸들러
document.addEventListener("click", function(e) {      
    if (e.target.classList.contains('modal__wrap--bg')) {        
        // const activeModal = e.target;
        setTimeout(() => {
            e.target.classList.remove('is-active');

            // activeModal.classList.remove('is-active');
            document.body.classList.remove('modal-open');     
        }, 300);         
        e.target.style.display = 'none';
        // activeModal.style.display = 'none';
    }
});

//모달창 닫기
const closeModal = (event, openButton) => {
    const btn = event.currentTarget;      
    const activeModal = btn.closest('.cmp-modal');  
    
    const totalModal = document.querySelectorAll('.cmp-modal.is-active');
    const modalLeith = totalModal.length

    if (activeModal) {
        activeModal.classList.remove('is-active')   
        if(modalLeith>1) {
            return;
        }     
        document.body.classList.remove('modal-open');
        
        setTimeout(() => {
            activeModal.style.display = 'none';
        }, 300);
    }
};
window.closeModal = closeModal;

const addCloseModalListeners = (target, openButton) => {
    const closeButtons = target.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => closeModal(event, openButton));
    });
};

// 모바일 버튼
const moButton = () => {
    const hamburger = document.querySelector('.btn-hambuger');

    if (!hamburger) {
        return; 
    }
    hamburger.addEventListener('click', () => {
        const moGnb = document.querySelector('.gnb-area-full');
        moGnb.classList.add('is-active');
        document.body.classList.add('modal-open');
    })
}
const moButtonClose = () => {
    const hamburger = document.querySelector('.btn-close-hamburger');
    if(!hamburger) {
        return; 
    }
    hamburger.addEventListener('click', () => {
        const moGnb = document.querySelector('.gnb-area-full');
        moGnb.classList.remove('is-active');
        document.body.classList.remove('modal-open');
    })
}

// 파일첨부
function initializeFileInputs() {
    // 모든 파일 입력(real-file-input) 요소를 찾습니다.
    const fileInputs = document.querySelectorAll('.real-file-input');

    // 찾은 각 파일 입력 요소에 대해 반복 작업을 수행합니다.
    fileInputs.forEach(function(input) {
        // 파일 입력 값이 변경될 때(파일이 선택될 때) 'change' 이벤트 리스너를 추가합니다.
        input.addEventListener('change', function(e) {
            // 파일이 선택되었는지 확인합니다.
            if (e.target.files && e.target.files.length > 0) {
                // 선택된 파일의 이름을 가져옵니다.
                const fileName = e.target.files[0].name;
                
                // 현재 파일 입력 요소의 부모(.file-input-wrapper)를 찾습니다.
                const wrapper = e.target.closest('.file-input-wrapper');
                
                // 부모 요소 내에서 파일 이름을 표시할 텍스트 필드(.display-file-name)를 찾습니다.
                const display = wrapper.querySelector('.display-file-name');
                
                // 텍스트 필드의 값을 선택된 파일 이름으로 변경합니다.
                if (display) {
                    display.value = fileName;
                }
            }
        });
    });
}

let timer; // 타이머 변수를 함수 외부에 선언

const jobCardTitle = () => {
    const titleArea = document.querySelector('.box-type.job-title');
    if (!titleArea) return;
    const titleOffset = titleArea.offsetTop;

    if (window.scrollY > titleOffset) {
        titleArea.classList.add('is-fixed');
    } else {
        titleArea.classList.remove('is-fixed');
    }
};

//gnb nav
// gnb-sub-list 높이 설정 함수
const setGnbSubListHeight = () => {
    const gnbSubLists = document.querySelectorAll('.gnb-sub-list');
    if(!gnbSubLists.length) {
        return;
    }
    
    // 각 gnb-sub-list의 자식 li 개수를 구해서 최대값 찾기
    let maxChildren = 0;
    gnbSubLists.forEach(subList => {
        const childrenCount = subList.querySelectorAll('li').length;
        if(childrenCount > maxChildren) {
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
    const gnbList = document.querySelector('.gnb-list');
    const gnbAreaFull = document.querySelector('.gnb-area-full');
    const gnbDimBg = document.querySelector('.gnb-dim-bg');
    
    if(!gnbList || !gnbAreaFull || !gnbDimBg) {
        return;
    }

    // 서브메뉴 열기 함수
    const openSubMenu = (target) => {
        gnbDimBg.classList.add('is-active');
        gnbDimBg.style.top = `${target.offsetTop + 63}px`;
        gnbList.classList.add('is-active');
        const subList = document.querySelectorAll('.gnb-sub-list');
        subList.forEach(item => {
            item.classList.add('is-active');
            document.querySelector('.mo-search-area').classList.remove('is-active');
        });
    };

    // 서브메뉴 닫기 함수
    const closeSubMenu = () => {
        gnbDimBg.classList.remove('is-active');
        const subList = document.querySelectorAll('.gnb-sub-list');
        gnbList.classList.remove('is-active');
        subList.forEach(item => {
            item.classList.remove('is-active');
            document.querySelector('.btn-close-search').click();
        });
    };

    // 각 GNB 메뉴 항목에 이벤트 추가
    const gnbItems = gnbList.querySelectorAll('li');
    gnbItems.forEach(item => {
        const subMenu = item.querySelector('.gnb-sub-list');
        if(subMenu) {
            // 메뉴 항목에 마우스 오버 시 서브메뉴 열기
            item.addEventListener('mouseenter', () => {
                openSubMenu(item);
                document.querySelector('.btn-close-search').click();
            });
            item.addEventListener('focusin', () => {
                openSubMenu(item);
                document.querySelector('.btn-close-search').click();
            });
        }
    });

    // 전체 GNB 영역에서 마우스가 벗어나면 서브메뉴 닫기
    gnbAreaFull.addEventListener('mouseleave', () => {
        closeSubMenu();
    });

    // GNB dim 배경에서 마우스가 벗어나도 서브메뉴 닫기
    gnbDimBg.addEventListener('mouseleave', () => {
        closeSubMenu();
    });
}

const gnbSearch = () => {
    const gnbSearchBtn = document.querySelector('.gnb-list li.search-item button');
    if(!gnbSearchBtn) {
        return;
    }
    gnbSearchBtn.addEventListener('click', () => {
        // gnb가 열려있는 상태면 닫기
        const gnbList = document.querySelector('.gnb-list');
        const gnbDimBg = document.querySelector('.gnb-dim-bg');
        
        if(gnbList && gnbList.classList.contains('is-active')) {
            // gnb 닫기
            gnbDimBg.classList.remove('is-active');
            gnbList.classList.remove('is-active');
            const subList = document.querySelectorAll('.gnb-sub-list');
            subList.forEach(item => {
                item.classList.remove('is-active');
            });
        }
        
        // 검색창 열기
        gnbSearchBtn.parentElement.classList.toggle('is-active');
        document.querySelector('.mo-search-area').classList.toggle('is-active');        
    })
}
const moSearchClose = () => {
    const moSearchCloseBtn = document.querySelector('.btn-close-search');
    if(!moSearchCloseBtn) {
        return;
    }
    moSearchCloseBtn.addEventListener('click', () => {
        document.querySelector('.mo-search-area').classList.remove('is-active');
        document.querySelector('.gnb-list li.search-item').classList.remove('is-active');
    })
}

const moGnb = () => {
    const moGnbList = document.querySelectorAll('.gnb-list li a');
    if(!moGnbList) {
        return;
    }
    
    // 첫 번째 메뉴의 하위메뉴를 기본적으로 열린 상태로 설정
    const firstMenuItem = document.querySelector('.gnb-list li:first-child');
    if(firstMenuItem) {
        firstMenuItem.classList.add('is-active');
        const firstSubMenu = firstMenuItem.querySelector('.gnb-sub-list');
        if(firstSubMenu) {
            firstSubMenu.classList.add('is-active');
        }
    }
    
    moGnbList.forEach(item => {
        item.addEventListener('click', () => {
            // 모든 메뉴의 is-active 클래스 제거
            const allMenuItems = document.querySelectorAll('.gnb-list li');
            allMenuItems.forEach(menuItem => {
                menuItem.classList.remove('is-active');
                const subMenu = menuItem.querySelector('.gnb-sub-list');
                if(subMenu) {
                    subMenu.classList.remove('is-active');
                }
            });
            
            // 클릭한 메뉴만 활성화
            item.parentElement.classList.add('is-active');    
            if(item.nextElementSibling) {
                item.nextElementSibling.classList.add('is-active');
            }        
        })
    })
}

// 스크롤 이벤트에 쓰로틀링 적용
window.addEventListener('scroll', () => {
    if (!timer) {
        timer = setTimeout(() => {
            timer = null; // 타이머 초기화
            jobCardTitle(); // 함수 실행
        }, 100); // 100ms(0.1초)마다 한 번씩만 실행
    }
});

window.addEventListener('resize', () => {
    copyDv();
    jobCardTitle();
    if(window.innerWidth > 768) {
        // PC 모드로 전환 시 모바일 GNB 클래스 제거
        const allMenuItems = document.querySelectorAll('.gnb-list li');
        allMenuItems.forEach(menuItem => {
            menuItem.classList.remove('is-active');
            const subMenu = menuItem.querySelector('.gnb-sub-list');
            if(subMenu) {
                subMenu.classList.remove('is-active');
            }
        });
        
        gnbMenu()
        setGnbSubListHeight()
        gnbSearch()
        moSearchClose()
    }
    if(window.innerWidth < 768) {
        moGnb()
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
    moButtonClose()
    dropdownList()
    if(window.innerWidth > 768) {
        gnbMenu()
        setGnbSubListHeight()
        gnbSearch()
        moSearchClose()
    }
    if(window.innerWidth < 768) {
        moGnb()
    }
});