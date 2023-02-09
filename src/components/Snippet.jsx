import Data from '../data';

const config = JSON.stringify(Data[0][0], null, 2);
const Snippet = () => {
    let line = `
    <div id="playerDiv"></div>
    <script src="https://demo.nanocosmos.de/nanoplayer/api/release/nanoplayer.4.min.js"></script>
    <script>
    let player;
    let config = `;
    line += `${config}; \n`;
    line += 'document.addEventListener(\'DOMContentLoaded\', function () {\r\n';
    line += '    player = new NanoPlayer(\'playerDiv\');\r\n';
    line += '    player.setup(config).then(\r\n';
    line += '        function (config) {\r\n';
    line += '            console.log(\'setup success\');\r\n';
    line += '        },\r\n';
    line += '        (error) => {\r\n';
    line += '            alert(error.message);\r\n';
    line += '        }\r\n';
    line += '    );\r\n';
    line += '});\r\n';
    line += '</script>';
    return line;
};

export default Snippet;
