class Dnf {
    //D
    data = [
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 1],
        [1, 1, 0, 0, 1],
        [1, 0, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [1, 1, 1, 0, 1],
        [0, 0, 1, 1, 1]
    ];

    //P
    positive = [];
    negative = [];
    h = '';
    r;


    constructor(data) {
        this.data = data;
    }

    solve() {
        this.positiveExamples();

        let im = 0;
        while (this.positive.length > 0) {
            this.negativeExamples();//N
            this.r = ''; //r

            let excluded = [];
            let featuresToCheck = [];

            while (this.negative.length > 0) {
                let f = this.selectF(excluded);

                featuresToCheck.push(f);
                this.r = this.r + " ∧ f" + (f + 1);

                for (let i = 0; i < this.negative.length; i++) {
                    if (this.data[this.negative[i]][f] === 0) {
                        let removed = this.negative.splice(i, 1)[0];
                        excluded.push(removed);
                    }
                }
                if(im > 10000) {
                    break;
                }
                im++;
                console.log(im);
            }

            this.r = this.r.replace(" ∧", '');
            this.h = this.h + " V (" + this.r + ")";

            this.setCoverage(featuresToCheck);
            console.log(this.data);

            im++;
            if(im > 10000) {
                this.h = "Nie istnieje DNF. "
                break;
            }
        }
        this.h = this.h.replace(" V", '');
        return this.h;
    }

    positiveExamples() {
        for (let i = 0; i < this.data.length; i++) {
            if (parseInt(this.data[i][this.data[i].length - 1]) === 1) {
                this.positive.push(i);
            }
        }
    }

    negativeExamples() {
        for (let i = 0; i < this.data.length; i++) {
            if (parseInt(this.data[i][this.data[i].length - 1]) === 0) {
                this.negative.push(i);
            }
        }
    }

    selectF(excluded) {
        let features = [];
        for (let i = 0; i < this.data[0].length - 1; i++) {

            let fTrue = 0;
            let fFalse = 0;

            for (let j = 0; j < this.data.length; j++) {
                if (excluded.indexOf(j) !== -1) {
                    continue;
                }

                if (this.data[j][i] === 1 && this.data[j][this.data[j].length - 1] === 1) {
                    fTrue++;
                } else if (this.data[j][i] === 1 && this.data[j][this.data[j].length - 1] === 0) {
                    fFalse++;
                }
            }


            features.push(fTrue / Math.max(fFalse, 0.0001));

        }

        return features.indexOf(Math.max(...features));
    }

    setCoverage(featuresToCheck) {
        for (let i = 0; i < this.data.length; i++) {
            let trueConjunction = true;
            for (let j = 0; j < featuresToCheck.length; j++) {
                if (this.data[i][featuresToCheck[j]] === 0) {
                    trueConjunction = false;
                    break;
                }
            }

            if (trueConjunction === true) {
                for (let j = 0; j < featuresToCheck.length; j++) {
                    this.data[i][featuresToCheck[j]] = 0;
                }
                this.positive.splice(this.positive.indexOf(i), 1);
            }
        }
    }
}
