let output = document.querySelector('#result');

        // button click trigger 
        document.querySelector('#fetch_trigger').addEventListener('click', function () {
        let key = document.querySelector('#input-id').value;


            output.innerHTML = "";

            fetchData(key)

        })

        //fetch key 
        function fetchData(key) {

            fetch('https://rest.entitysport.com/v2/matches/?status=2&token=ec471071441bb2ac538a0ff901abd249&per_page=10&&paged=1')
                .then(response => response.json())
                .then(data => ckechKey(data, key));

        }

        //check user eneterd key
        function ckechKey(data, key) {

            debugger;
            for (let i = 0; i < data.response.items.length; i++) {

                if (data.response.items[i].match_id == key) {
                    outputResult(data.response.items[i]);
                    console.log('working');
                }

                else if (key == "") {
                    noKeyEntered();
                    break;
                }

            }
        }

        //displaying result
        function outputResult(item) {
            let matchTitle = item.title;
            let competitionDate = item.competition.datestart;
            let competitionFormat = item.format_str;
            let totalMatches = item.competition.total_matches;
            let matchResult = item.status_note;


            let teamalogoSrc = item.teama.logo_url;
            let teamblogoSrc = item.teamb.logo_url;

            let compDetialsTag = document.createElement('p');
            compDetialsTag.innerHTML = "<h1><u>Competition Details</u></h1>";

            let matchTitleTag = document.createElement('p');
            matchTitleTag.innerHTML = "<h2>Title</h2>" + `<img class="teamaLogo" src=${teamalogoSrc}>` + "  " + matchTitle + "  " + `<img class="teamaLogo" src=${teamblogoSrc}>`;

            let compFormatTag = document.createElement('p');
            compFormatTag.innerHTML = "<h2>Competition Strat Date</h2>" + competitionFormat;

            let matchDateTag = document.createElement('p');
            matchDateTag.innerHTML = "<h2>Competition Strat Date</h2>" + competitionDate;

            let totalMatchesTag = document.createElement('p');
            totalMatchesTag.innerHTML = "<h2>Total Matches</h2>" + totalMatches;

            let matchStatusTag = document.createElement('p');
            matchStatusTag.innerHTML = "<h2>Competition Status</h2>" + matchResult;

            output.appendChild(compDetialsTag);
            output.appendChild(matchTitleTag);
            output.appendChild(compFormatTag)
            output.appendChild(matchDateTag)
            output.appendChild(totalMatchesTag)
            output.appendChild(matchStatusTag)


        }

        // // key not found
        // function resultNotFound() {
        //     let notFoundTag = document.createElement('p');
        //     notFoundTag.innerHTML = "<h2 style='color:red'>Result Not Found. Please enter a valid key.</h2>";

        //     output.appendChild(notFoundTag)
        // }

        //key not entered
        function noKeyEntered() {
            let noKeyEnteredTag = document.createElement('p');
            noKeyEnteredTag.innerHTML = "<h2 style='color:red'>Please Enter Competitin ID</h2>";

            output.appendChild(noKeyEnteredTag)
        }