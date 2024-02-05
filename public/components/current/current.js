exports.current = current = (seasonNumber ,content, eventsLength, numberOfEvents) =>`
    <section class="current" id="current">
        <!-- <div class="current-prev">
            <button id="${seasonNumber-1}" class="current-prev-button">
            <?xml version="1.0" encoding="iso-8859-1"?> Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools
            <svg fill="#63489d" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                viewBox="0 0 512.013 512.013" xml:space="preserve">
                <style>

                    #Layer_1 {
                        width: 64px
                    }

                    g {
                        width: 20px
                    }

                    g > g {
                        width: 20px
                    }

                    g > g > path {
                        width: 20px
                    }

                    @media screen and (min-width: 320px) and (max-width: 480px) {

                        #Layer_1 {
                            width: 20px
                        }

                        g {
                            width: 20px
                        }

                        g > g {
                            width: 20px
                        }

                        g > g > path {
                            width: 20px
                        }

                    }
                    
                    @media screen and (min-width: 481px) and (max-width: 768px) {

                        #Layer_1 {
                            width: 30px
                        }

                        g {
                            width: 30px
                        }

                        g > g {
                            width: 30px
                        }

                        g > g > path {
                            width: 30px
                        }

                    }

                    @media screen and (min-width: 769px) and (max-width: 1024px) {

                        #Layer_1 {
                            width: 40px
                        }

                        g {
                            width: 40px
                        }

                        g > g {
                            width: 40px
                        }

                        g > g > path {
                            width: 40px
                        }

                    }

                </style>
                <g>
                    <g>
                        <path d="M366.64,256.013L508.677,32.802c5.141-8.107,4.267-18.624-2.176-25.749c-6.443-7.168-16.832-9.067-25.365-4.8
                            L11.802,236.92c-7.232,3.627-11.797,11.008-11.797,19.093c0,8.085,4.565,15.467,11.797,19.093l469.333,234.667
                            c3.029,1.515,6.293,2.24,9.536,2.24c5.888,0,11.691-2.432,15.829-7.04c6.443-7.125,7.317-17.643,2.176-25.749L366.64,256.013z"/>
                    </g>
                </g>
            </svg>
            </button>
        </div>-->
        <div class="current-body">
            <div class="current-body-header">
                <h1 id="${seasonNumber}" class="current-header__text">ТЕКУЩИЙ СЕЗОН</h1>
            </div>
            <div class="current-body-content">
                ${content}
            </div>
            <div class="current-body-footer">
                <h1 class="-current-footer__text">ВЫПУСКОВ: ${eventsLength} из ${numberOfEvents}</h1>
            </div>
        </div>
        <!--<div class="current-next">
            <button id="${seasonNumber+1}" class="current-next-button">
                <?xml version="1.0" encoding="iso-8859-1"?>Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools
                <svg fill="#63489d" height="64px" width="64px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    viewBox="0 0 512.008 512.008" xml:space="preserve">
                    <g>
                        <g>
                            <path d="M500.208,236.915L30.875,2.248C22.32-2.019,11.952-0.099,5.51,7.048c-6.443,7.125-7.317,17.643-2.176,25.749
                                l142.037,223.211L3.334,479.219c-5.141,8.107-4.267,18.624,2.176,25.749c4.139,4.608,9.941,7.04,15.829,7.04
                                c3.243,0,6.507-0.725,9.536-2.24l469.333-234.667c7.232-3.627,11.797-11.008,11.797-19.093S507.44,240.541,500.208,236.915z"/>
                        </g>
                    </g>
                </svg>
            </button>
        </div>-->
    </section>
`