// window.addEventListener('scroll', () => {
//     document.Scroll.style.setProperty('--scroll',window.pageYOffset / (document.Scroll.offsetHeight - window.innerHeight));
//   }, false);
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const main = $('.main')
const contentMain = $('.content_main')
const contentImage = $('.content_element .img_e')
const playBtn = $$('.control .icon-toggle-play i')
const audio = $('.control audio')
const runMusic = $('.control #runMusic')
const backBtn = $('.control .backSong')
const nextBtn = $('.control .nextSong')
const shuffleBtn = $('.control .shuffleSong')
const repeatBtn = $('.control .repeatSong')
const elementSong = $$('.content_main')
const container = $('.container')
const nav = $('.nav')
const volum = $('.control .control_right input[type = range]')
const dropdownBtn = $('.contact .profile')
const dropdown = $('.contact .profile .dropdown')

const app = {
    currentIndex: 0,
    isPlayBtn: false,
    isShuffleBtn: false,
    isRepeatBtn: false,
    isDropdown: false,
    songP1: [
        {
            name: 'Bớt Quan Trọng, Thêm Hạnh Phúc',
            fullName: 'Bớt Quan Trọng, Thêm Hạnh Phúc',
            author: 'Hiếu TV',
            path: './assets/audio/song1.mp3',
            image: './assets/image/song1.jpg'
        },
        {
            name: 'Thanh Xuân',
            fullName: 'Thanh Xuân',
            author: 'Da LAB',
            path: './assets/audio/song2.mp3',
            image: './assets/image/song2.jpg'
        },
        {
            name: 'Thủ đô Cypher',
            fullName: 'Thủ Đô Cypher',
            author: "Beck'Stage X Biti's Hunter ( RPT Orijinn, LOW G, RZMas, RPT MCK)",
            path: './assets/audio/song3.mp3',
            image: './assets/image/song3.jpg'
        },
        {
            name: 'Rolling in the Deep',
            fullName: 'Rolling in the Deep',
            author: "Adele",
            path: './assets/audio/song4.mp3',
            image: './assets/image/song4.jpg'
        },
        {
            name: 'Skyfall',
            fullName: 'Skyfall',
            author: "Adedle",
            path: './assets/audio/song5.mp3',
            image: './assets/image/song5.jpg'
        },
        {
            name: 'Making My Way',
            fullName: 'Making My Way',
            author: "Sơn Tùng MTP",
            path: './assets/audio/song6.mp3',
            image: './assets/image/song6.jpg'
        },
        {
            name: 'Đừng Về Trễ Nha',
            fullName: 'Đừng Về Trễ Nha',
            author: "Sơn Tùng MTP",
            path: './assets/audio/song7.mp3',
            image: './assets/image/song7.jpg'
        }
    ],
    render: function () {
        const htmls = this.songP1.map( (element, index) => {
            return `
                <div class="content_element" data-index="${index}">
                    <div class="img_e" style="
                        background-image: url('${element.image}')">
                        <div class="img_e_sub" style="
                            background-image: url('${element.image}')
                        ">
                        </div>
                    </div>
                    <h2 class="text_e">${element.name}</h2>
                    <p class="text_date">26 Thg 2 . 15 Phút</p>
                </div>
            `
        })
        contentMain.innerHTML = htmls.join('')
    },
    renderListTop: function () {
        const rderList = this.songP1.map( (element, index) => {
            return `
                <div class="content_element" data-index="${index}">
                    <div class="img_e" style="
                        background-image: url('${element.image}')">
                        <div class="img_e_sub" style="
                            background-image: url('${element.image}')
                        ">
                        </div>
                    </div>
                    <h2 class="text_e">${element.name}</h2>
                    <p class="text_date">26 Thg 2 . 15 Phút</p>
                </div>
            `
        })
        $('.content .content_for_you_main').innerHTML = rderList.join('')
    },
    handleEvent: function () {

        const _this = this

        playBtn.forEach((element, index) => {

            // todo: toggle nút play => pause
            element.onclick = function () {
                $('.control .control_center .control_icon .icon-toggle-play .fa-solid.hideBtn').classList.remove('hideBtn')
                element.classList.add('hideBtn')
                if (_this.isPlayBtn == false) {
                    _this.isPlayBtn = true
                    audio.play()
                } else {
                    _this.isPlayBtn = false
                    audio.pause()
                }
            }
        });

        // todo: thời gian phát nhạc
        audio.ontimeupdate = function () {
            runMusic.value = Math.floor(this.currentTime / this.duration * 100)
        }

        // todo: khi tua nhạc
        runMusic.onchange = function () {
            const newTimeMusic = runMusic.value
            audio.currentTime = newTimeMusic * audio.duration / 100
        }

        // todo: back lại song
        backBtn.onclick = function () {
            playBtn[0].classList.add('hideBtn')
            playBtn[1].classList.remove('hideBtn')

            if (_this.isShuffleBtn == true) {
                _this.shuffleSong()
            } else {
                _this.backSong()
            }
            audio.play()
        }

        // todo: next song
        nextBtn.onclick = function () {
            playBtn[0].classList.add('hideBtn')
            playBtn[1].classList.remove('hideBtn')

            if (_this.isShuffleBtn == true) {
                _this.shuffleSong()
            } else {
                _this.nextSong()
            }
            audio.play()
        }

        // todo: shuffle song
        shuffleBtn.onclick = function () {
            if (_this.isShuffleBtn == false) {
                this.style.color = 'red'
                _this.isShuffleBtn = true
                
            } else {
                this.style.color = '#fff'
                _this.isShuffleBtn = false
            }
        }

        // todo: repeat song
        repeatBtn.onclick = function () {
            if (_this.isRepeatBtn == false) {
                this.style.color = 'red'
                _this.isRepeatBtn = true
            } else {
                this.style.color = '#fff'
                _this.isRepeatBtn = false
            }
        }

        // todo: khi kết thúc nhạc
        audio.onended = function () {
            if (_this.isRepeatBtn == false) {
                nextBtn.click()
            } else {
                audio.play()
            }
        }

        // todo: Volum
        volum.onchange = function () {
            const volumValue = volum.value / 100
            audio.volume = volumValue
        }

        // todo: click vào bài hát
        elementSong.forEach( (element, index) => {
            element.onclick = function (e) {
            
                const songNode = e.target.closest('.content_element')
                _this.clickSongNew(songNode.getAttribute('data-index'))
    
                playBtn[0].classList.add('hideBtn')
                playBtn[1].classList.remove('hideBtn')
                if (_this.isPlayBtn == false) {
                    _this.isPlayBtn = true
                } else {
                    _this.isPlayBtn = false
                }
                audio.play()
    
            }
        })

        // todo: khi scroll
        container.onscroll = function (e) {
            const scrollValue = Math.floor(container.scrollTop)

            if (scrollValue > 10) {
                nav.classList.add('bg1')
            } 
            else {
                nav.classList.remove('bg1')
            }
            if (scrollValue > 200) {
                nav.classList.add('bg2')
            } else {
                nav.classList.remove('bg2')
            }
        }

        // todo: click dropdown 
        dropdownBtn.onclick = function () {
            if (this.isDropdown == false) {
                dropdown.style.visibility = 'visible'
                this.isDropdown = true
            } else {
                dropdown.style.visibility = 'hidden'
                this.isDropdown = false
            }
        }

    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songP1[this.currentIndex]
            }
        })
    },
    loadCurrentSong: function () {
        audio.src = this.currentSong.path

        // listsub
        $('.control .control_listSub .img').style.backgroundImage = `url('${this.currentSong.image}')`
        $('.control .control_listSub .listSubName h5').innerText = `${this.currentSong.fullName}`
        $('.control .control_listSub .listSubName p').innerText = `${this.currentSong.author}`

    },
    backSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songP1.length - 1
        }
        this.loadCurrentSong()
    },
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex > this.songP1.length - 1) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    shuffleSong: function () {
        do {
            var randomShuff = Math.floor(Math.random() * this.songP1.length)
        } while (randomShuff == this.currentIndex)
        this.currentIndex = randomShuff
        this.loadCurrentSong()
    },
    clickSongNew: function (element) {
        this.currentIndex = Number(element)
        this.loadCurrentSong()
    },
    start: function () {
        // todo: lấy ra phần tử song hiện tại
        this.defineProperties()

        // * thực hiện các sự kiện
        this.handleEvent()

        // todo: đưa path nhạc vào audio
        this.loadCurrentSong()

        // * tải lại web
        this.render()

        this.renderListTop()
    }
}

app.start()