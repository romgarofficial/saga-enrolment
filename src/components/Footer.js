export default function Footer(){
    return(
        <footer class="bg-dark text-center text-white position-relative">
            <div class="container p-4 pb-0">
                <p class="text-warning">Connect with us on our social networks:</p>
                <section class="mb-4">
                <a class="btn btn-outline-warning btn-floating m-1" href="https://web.facebook.com/SAGSHS/" target="_blank" role="button"
                    ><i class="fab fa-facebook-f"></i
                ></a>

                <a class="btn btn-outline-warning btn-floating m-1" href="https://m.me/SAGSHS" target="_blank"  role="button"
                    ><i class="fab fa-facebook-messenger"></i
                ></a>

                <a class="btn btn-outline-warning btn-floating m-1" href="mailto:sagacademy.mailer@gmail.com" role="button"
                    ><i class="fab fa-google"></i
                ></a>

                </section>
            </div>

            <div class="text-center text-warning p-3 d-flex flex-column bg-darker">
                <span>© 2023 - 2024 Copyright</span> 
                <a class="text-warning" href="index.html">St. Aloysius Gonzaga Academy, Inc.</a>
            </div>
        </footer>
    )
}