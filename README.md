# DNF
DNF algorithm w języku javaScript

- algorytm (DNF):
- D = zbiór danych
- P = przykłady pozytywne w D
- h = false
- pętla aż P będzie puste
- r= true
- N = przykłady negatywne w D
- pętla aż N będzie puste
- jeśli wszystkie cechy są w r to porażka
- w przeciwnym przypadku wybierz cechę fj i dodaj do r
- r = r & fj
- N = N – (przypadki w N, dla których fj==0)
- h = h || r
- pokrycie = przykłady w P pokryte przez r
- jeśli pokrycie jest puste to porażka
- w innym przypadku P = P – pokrycie
- end


![Screenshot_2020-02-11 DNF](https://user-images.githubusercontent.com/42850304/74266075-f8a49e00-4d03-11ea-8302-ceda8972eebc.png)
