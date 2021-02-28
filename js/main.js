// ABOUT SECTION
(()=>{

    //---Navigation menu------
    navigationMenu()

    const aboutSection = document.querySelector('.about-section'),
    tabsContainer = document.querySelector('.about-tabs');

    tabsContainer.addEventListener('click',(e)=>{
        if(e.target.classList.contains('tab-item') && !e.target.classList.contains('active')){
            const target = e.target.getAttribute('data-target');

            tabsContainer.querySelector('.active').classList.remove('outer-shadow','active')
            e.target.classList.add('active','outer-shadow')

            aboutSection.querySelector('.tab-content.active').classList.remove('active');
            aboutSection.querySelector(target).classList.add('active');
        }
    })
  
    
    let el = document.querySelector('.skills')
    let progressBar = document.getElementsByClassName('progress-bar')
    window.addEventListener('scroll',(e)=>{
        if(window.scrollY>=Math.floor(el.getBoundingClientRect().top)){
            for(let i=0;i<progressBar.length;i++){
                let sp = parseInt(progressBar[i].dataset.spin)
                let num = Math.floor(526 * sp/100);
                progressBar[i].style.width = `${num}px`
                progressBar[i].style.animationPlayState = 'running'
            }
        }
    })

    // portfolio filter and popup //

    const filterContainer = document.querySelector('.portfolio-filter'),portfolioItemsContainer = document.querySelector('.portfolio-items'),portfolioItems = document.querySelectorAll('.portfolio-item'),
    popUp = document.querySelector('.portfolio-popup'),
    prevBtn = document.querySelector('.pp-prev'),
    nextBtn = document.querySelector('.pp-next'),
    closeBtn = document.querySelector('.pp-close'),
    projectDetailsContainer = popUp.querySelector('.pp-details'),
    projectDetailsBtn = popUp.querySelector('.pp-project-details-btn')

    let itemIndex,slideIndex,screenshots

    //filter portfolio items

    filterContainer.addEventListener('click',(e)=>{
        if(e.target.classList.contains("filter-item") && !e.target.classList.contains("active")){
            filterContainer.querySelector('.active').classList.remove("active","outer-shadow")

            e.target.classList.add("active","outer-shadow")

            const target = e.target.getAttribute('data-target')
            portfolioItems.forEach((item)=>{
                if(item.getAttribute('data-category')===target || target==='all'){
                    item.classList.remove('hide')
                    item.classList.add('show')
                }else{
                    item.classList.remove('show')
                    item.classList.add('hide')
                }
            })
        }
    })


    portfolioItemsContainer.addEventListener('click',(e)=>{
        if(e.target.closest(".portfolio-item-inner")){
            const portfolioItem = e.target.closest(".portfolio-item-inner").parentElement;

            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem)
            screenshots = portfolioItems[itemIndex].querySelector('.portfolio-item-img img').getAttribute('data-screenshot')
            screenshots = screenshots.split(",");
            if(screenshots.length===1){
                prevBtn.style.display = 'none'
                nextBtn.style.display = 'none'
            }else{
                prevBtn.style.display = 'block'
                nextBtn.style.display = 'block'
            }
            slideIndex = 0;
            popUpToggle();
            popUpSlideshow();
            popUpDetails();
        }
    })

    closeBtn.addEventListener('click',(e)=>{
        popUpToggle();
        if(projectDetailsContainer.classList.contains("active")){
            popUpDetailsToggler()
        }
    })

    function popUpToggle(){
        popUp.classList.toggle('open');
        bodyStopScrolling()
    }

    function popUpDetails(){
        if(!portfolioItems[itemIndex].querySelector('.portfolio-item-details')){
            projectDetailsBtn.style.display = "none";
            return;
        }
        projectDetailsBtn.style.display = "block";
        const details = portfolioItems[itemIndex].querySelector('.portfolio-item-details').innerHTML;
        popUp.querySelector('.pp-project-details').innerHTML = details

        const title = portfolioItems[itemIndex].querySelector('.portfolio-item-title').innerHTML
        popUp.querySelector('.pp-title h2').innerHTML = title

        const category = portfolioItems[itemIndex].getAttribute('data-category');
        popUp.querySelector('.pp-project-category').innerHTML = category.split('-').join(" ");
    }

    function popUpSlideshow(){
        const imgSrc = screenshots[slideIndex];
        const popUpImg = popUp.querySelector('.pp-img');
        popUp.querySelector('.pp-loader').classList.add('active')
        popUpImg.src = imgSrc;
        popUpImg.onload = ()=>{
            popUp.querySelector('.pp-loader').classList.remove('active')
        }
        popUp.querySelector('.pp-counter').innerHTML = `${slideIndex+1} of ${screenshots.length}`
    }

    nextBtn.addEventListener('click',()=>{
        if(slideIndex===screenshots.length-1){
            slideIndex = 0;
        }else{
            slideIndex++;
        }
        popUpSlideshow()
    })

    prevBtn.addEventListener('click',()=>{
        if(slideIndex===0){
            slideIndex = screenshots.length-1;
        }else{
            slideIndex--;
        }
        popUpSlideshow()
    })

    projectDetailsBtn.addEventListener('click',()=>{
        popUpDetailsToggler()
    })

    function popUpDetailsToggler(){
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsContainer.classList.remove('active')
            projectDetailsContainer.style.maxHeight = "0px";
            projectDetailsBtn.querySelector('i').classList.remove("fa-minus")
            projectDetailsBtn.querySelector('i').classList.add("fa-plus")
        }else{
            projectDetailsBtn.querySelector('i').classList.remove("fa-plus")
            projectDetailsBtn.querySelector('i').classList.add("fa-minus")
            projectDetailsContainer.classList.add('active')
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popUp.scrollTo(0,projectDetailsContainer.offsetTop);
        }
    }

    //---Testimonial section----///
        testimonial()
    //---Section Hide-----//
        hideSection()
    

})()

function bodyStopScrolling(){
    document.body.classList.toggle('stop-scrolling');
}

function testimonial(){
    let sliderContainer = document.querySelector('.testi-slider-container');
    slides = sliderContainer.querySelectorAll('.testi-item')
    slideWidth = sliderContainer.offsetWidth
    let prevBtn = document.querySelector('.testi-slider-nav .prev')
    let nextBtn = document.querySelector('.testi-slider-nav .next')
    let activeSlide = document.querySelector('.testi-item.active')
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);


    slides.forEach((slide)=>{
        slide.style.width = slideWidth+"px"
    })

    sliderContainer.style.width = slideWidth * slides.length + "px";

    nextBtn.addEventListener('click',()=>{
        if(slideIndex===slides.length-1){
            slideIndex = 0;
        }else{
            slideIndex++;
        }
        slider()
    })
    prevBtn.addEventListener('click',()=>{
        if(slideIndex===0){
            slideIndex = slides.length-1;
        }else{
            slideIndex--;
        }
        slider()
    })

    function slider(){
        sliderContainer.querySelector('.testi-item.active').classList.remove("active")

        slides[slideIndex].classList.add("active")
        sliderContainer.style.marginLeft = -(slideWidth*slideIndex) + "px"
    }    
    slider()

    
}

function navigationMenu(){
    let hamburgerMenu = document.querySelector('.hamburger-btn')
    let navMenu = document.querySelector('.nav-menu')
    let closeBtn = navMenu.querySelector('.close-nav-menu')

    hamburgerMenu.addEventListener('click',()=>{
        navMenu.classList.add("open")
        bodyStopScrolling()
    })

    closeBtn.addEventListener('click',()=>{
        navMenu.classList.remove("open")
        bodyStopScrolling()
    })

    document.addEventListener('click',(e)=>{
        if(e.target.classList.contains("link-item")){
            if(e.target.hash!==""){
                e.preventDefault()
                let hash = e.target.hash
                
                document.querySelector('.section.active').classList.add("hide")
                document.querySelector('.section.active').classList.remove("active")

                document.querySelector(hash).classList.add("active")
                document.querySelector(hash).classList.remove("hide")

                navMenu.querySelector('.active').classList.add("outer-shadow","hover-in-shadow")
                navMenu.querySelector('.active').classList.remove("inner-shadow","active")
                if(navMenu.classList.contains("open")){
                    e.target.classList.add("active","inner-shadow")
                    e.target.classList.remove("outer-shadow","hover-in-shadow")
    
                    navMenu.classList.remove("open")
                    bodyStopScrolling()
                }else{
                    let navItems = navMenu.querySelectorAll('.link-item')
                    navItems.forEach((item)=>{
                        if(hash===item.hash){
                            item.classList.add("active","inner-shadow")
                            item.classList.remove("outer-shadow","hover-in-shadow")
                        }
                    })
                    fadeOutEffect()
                }
                window.location.hash = hash
            }
        }
    })
}

function fadeOutEffect(){
    document.querySelector('.fade-out-effect').classList.add("active")
    setTimeout(()=>{
        document.querySelector('.fade-out-effect').classList.remove("active") 
    },100)
}

function hideSection(){
    let sections = document.querySelectorAll('.section')
    sections.forEach((section)=>{
        if(!section.classList.contains("active")){
            section.classList.add("hide")
        }
    })
}  
//preloader remove
window.addEventListener('load',()=>{
    document.querySelector('.preloader').classList.add("fade-out");
    setTimeout(()=>{
        document.querySelector('.preloader').style.display = 'none'
    },600)
})












