//TODO losuj plik
class EventHandler {
    DNF;
    Validator;

    constructor() {


        document.addEventListener("DOMContentLoaded", () => {

            let loadFile = document.querySelector("#loadFile");
            loadFile.addEventListener("click", () => {
                this.loadFile();
            });

            let solveDnf = document.querySelector("#solveDnf");
            solveDnf.addEventListener("click", () => {
                this.solve();
            });

            let randFileBtn = document.querySelector("#btnRandomFile");
            randFileBtn.addEventListener("click", () => {
                this.randomFile();
            })
        })
    }

    loadFile() {
        let file = document.getElementById("file").files[0];
        let reader = new FileReader();

        reader.onload = (e) => {
            let result = e.target.result.split("\r\n").map(function (x) {
                return x.split(' ');
            });

            this.Validator = new Validator(result);
            let validateData = this.Validator.validate()
            if (validateData !== false) {
                this.DNF = new Dnf(result);
                document.querySelector("#file-status").innerText = "Wczytano plik."
            }


        };
        reader.readAsText(file);
    }

    solve() {
        if (typeof this.DNF === "undefined") {
            alert("Najpierw wczytaj poprawnie plik");
            return false;
        }
        let result = this.DNF.solve();
        this.displayResult(result);

    }

    displayResult(result) {
        document.querySelector("#result-box").innerText = "Wynik" +result;
    }


}

let eventHandler = new EventHandler();