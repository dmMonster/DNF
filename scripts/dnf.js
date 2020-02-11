class Dnf {
    //D //example array
   /* data = [
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 1],
        [1, 1, 0, 0, 1],
        [1, 0, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [1, 1, 1, 0, 1],
        [0, 0, 1, 1, 1]
    ];

    */


    constructor(data) {
        this.data = data;
        this.positive = [];
        this.negative = [];
        this.r = '';
        this.h = '';
    }

    solve() {
        this.positiveExamples();

        let im = 0;
        while (this.positive.length > 0) {
            this.negativeExamples();//N
            this.r = ''; //r

            let excluded = [];
            let featuresToCheck = [];

            let rCounter = 0;
            while (this.negative.length > 0) {
                let f = this.selectF(excluded);
				
				
                featuresToCheck.push(f);
                if (this.r.indexOf("f" + (f + 1)) === -1) {
                    this.r = this.r + " ∧ f" + (f + 1);
                }


                for (let i = 0; i < this.data.length; i++) {
                    if (this.data[i][f] === 0 && this.negative.indexOf(i) !== -1) {
						let indexToDelete = this.negative.indexOf(i);
                        let removed = this.negative.splice(indexToDelete, 1)[0];
                        excluded.push(removed);
                    }
                }
                rCounter++;
                if (im > 10000 || rCounter > this.data[0].length - 1 ) {
                    break;
                }
                im++;
            }

            this.r = this.r.replace(" ∧", '');
            this.h = this.h + " V (" + this.r + ")";

            let coverage = this.setCoverage(featuresToCheck);

            im++;
            if(coverage === false) {
                im += 10000;
            }
            if (im > 10000) {
                this.h = " Porażka. Nie istnieje DNF.";
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
                let coverage = this.positive.splice(this.positive.indexOf(i), 1);
                if(coverage.length === 0) {
                    return false;
                }

            }
        }

        return true;
    }
}
