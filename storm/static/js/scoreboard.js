function updatescores() {
    $.get(script_root + '/api/v1/scoreboard', function(response) {
        var teams = response.data;
        var table = $('#scoreboard tbody');
        table.empty();
        for (var i = 0; i < teams.length; i++) {
            var row = "<tr>\n" +
                '<th scope="row" class="uk-text-center" style="color: white">{0}</th>'.format(teams[i]['pos']) +
                '<td><a href="{0}/team/{1}">{2}</a></td>'.format(script_root,teams[i]['id'],htmlentities(teams[i]['name'])) +
                "<td style='color: white'>{0}</td>".format(teams[i]['score']) +
                "</tr>";
            table.append(row);
        }
    });
}

function cumulativesum(arr) {
    var result = arr.concat();
    for (var i = 0; i < arr.length; i++) {
        result[i] = arr.slice(0, i + 1).reduce(function(p, i) { return p + i; });
    }
    return result
}

function UTCtoDate(utc) {
    var d = new Date(0);
    d.setUTCSeconds(utc);
    return d;
}

function scoregraph() {
    $.get(script_root + '/api/v1/scoreboard/top/10', function(response) {
        var places = response.data;

        if (Object.keys(places).length === 0) {
            // Replace spinner
            $('#score-graph').html(
                '<div class="uk-text-center"><h2>No solves yet</h2></div>'
            );
            return;
        }

        var teams = Object.keys(places);
        var traces = [];
        for (var i = 0; i < teams.length; i++) {
            var team_score = [];
            var times = [];
            for (var j = 0; j < places[teams[i]]['solves'].length; j++) {
                team_score.push(places[teams[i]]['solves'][j].value);
                var date = moment(places[teams[i]]['solves'][j].date);
                times.push(date.toDate());
            }
            team_score = cumulativesum(team_score);
            var trace = {
                x: times,
                y: team_score,
                mode: 'lines+markers',
                name: places[teams[i]]['name'],
                marker: {
                    color: colorhashSCOREBOARD(places[teams[i]]['name'] + places[teams[i]]['id'], i),
                },
                line: {
                    color: colorhashSCOREBOARD(places[teams[i]]['name'] + places[teams[i]]['id'], i),
                }
            };
            traces.push(trace);
        }

        traces.sort(function(a, b) {
            var scorediff = b['y'][b['y'].length - 1] - a['y'][a['y'].length - 1];
            if (!scorediff) {
                return a['x'][a['x'].length - 1] - b['x'][b['x'].length - 1];
            }
            return scorediff;
        });

        var layout = {
            title: 'Top 10 Teams',
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            hovermode: 'closest',
            titlefont: {
                family: 'Raleway',
                size: '36',
                color: 'white'
            },
            xaxis: {
                showgrid: false,
                showspikes: true,
                color: 'white',
            },
            yaxis: {
                showgrid: false,
                showspikes: true,
                color: 'white',
            },
            legend: {
                orientation: "h",
                family: 'Raleway',
                font: {
                    color: "white",
                    size: "14"
                }
            },
            marker: {
                symbol: "diamond-dot"
            },
            hoverlabel: {
                bgcolor: "black",
                font: {
                    family: "Raleway",
                    size: "20"
                }
            }
        };

        $('#score-graph').empty(); // Remove spinners
        document.getElementById('score-graph').fn = 'CTFd_scoreboard_' + (new Date).toISOString().slice(0, 19);
        Plotly.newPlot('score-graph', traces, layout, {
            // displayModeBar: false,
            displaylogo: false
        });

    });
}

function update() {
    updatescores();
    scoregraph();
}
setInterval(update, 10000); // Update every 10s
scoregraph();

window.onresize = function() {
    Plotly.Plots.resize(document.getElementById('score-graph'));
};

