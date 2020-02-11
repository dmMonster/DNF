class Validator {

    constructor(data) {
        this.data = data;
    }

    validate() {
        let rows = this.data.length;
        let columns = this.data[0].length;


        for (let i = 0; i < rows; i++) {
            if (this.data[i].length !== columns) {
                alert("Nieprawidłowy format. Liczba kolumn w pliku nie jest równa dla każdej cechy. Sprawdź czy w pliku nie występują nadmiarowe spacje");
                return false;
            }
        }

        let string = JSON.stringify(this.data);
        let pattern = /^(\[\[){1}("0",|"1",|"0"],|"1"],|\["0",|\["1",|"1"|"0"){1,}\]]$/;

        if (!pattern.test(string)) {
            alert("Zły format. Dozwolone wyłącznie znaki: spacja, 0 ,1 i przejscie do nowej linii");
            return false;
        }

        this.convertToInt();
        return this.data;
    }

    convertToInt() {
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[0].length; j++) {
                this.data[i][j] = parseInt(this.data[i][j]);
            }
        }
    }

}