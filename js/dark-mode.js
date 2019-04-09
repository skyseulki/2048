
{/* <div class="dark-mode">
        <input type="button" id="dark-light" onclick="toggleDarkLight()" title="Dark Mode">🌛</button>
    </div> */}

$(document).ready(function() {
    $('#dark-light').on('click', (event) => {
        console.log('dark mode activated');
        if(event.target === true) {
            toggleDarkLight();
        }
    })
})

const toggleDarkLight = () => {
    
}