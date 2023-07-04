const { createApp } = Vue

createApp({
    data() {
        return {
            rodada: 1,
            games: jogos,
            times: teams
        }
    },
    mounted() {
        this.times.forEach((time) => {
            this.games.forEach((game) => {
                if(game.done) {
                    if(game.a === time.nome || game.b === time.nome) {
                        if(game.a === time.nome) {
                            if(game.golsa > game.golsb) {
                                time.vitorias++
                                time.pontos+= 3
                            }
                            else if(game.golsa < game.golsb) {
                                time.derrotas++
                            }
                            else {
                                time.empates++
                                time.pontos++
                            }                           
                        }                                                                    
                    }
                    if(game.b === time.nome || game.a === time.nome) {
                        if(game.b === time.nome) {
                            if(game.golsb > game.golsa) {
                                time.vitorias++
                                time.pontos+= 3
                            }
                            else if(game.golsb < game.golsa) {
                                time.derrotas++
                            }
                            else {
                                time.empates++
                                time.pontos++
                            }
                        }                        
                    }
                    if(game.a === time.nome) {
                        time.gm += game.golsa
                        time.gs += game.golsb
                        time.saldo = time.gm - time.gs
                    }
                    else if(game.b === time.nome) {
                        time.gm += game.golsb
                        time.gs += game.golsa
                        time.saldo = time.gm - time.gs
                    }
                }
            })
        })        
        this.times = this.times.sort(function(a, b) {
            return (b.pontos !== a.pontos ? b.pontos - a.pontos : b.vitorias - a.vitorias)
        })
        this.times = this.times.sort(function(a, b) {
            return (b.pontos !== a.pontos ? b.pontos - a.pontos : b.saldo - a.saldo)
        })       
    },
    methods: {
        simular(evt, id, time, n) {
            let jogo = this.games.filter(game => {
                return game.id === id
            })
            if(jogo !== null) {
                if(time === 'a') {
                    jogo[0].golsa = evt.target.value
                }
                else if(time === 'b') {
                    jogo[0].golsb = evt.target.value
                }
            }
            if(jogo[0].golsa !== '' && jogo[0].golsb !== '') {
                jogo[0].done = true            
                let timeA = this.times.filter(time => {
                    return time.nome === jogo[0].a
                })
                let timeB = this.times.filter(time => {
                    return time.nome === jogo[0].b
                })
                if(jogo[0].golsa > jogo[0].golsb) {
                    this.times.forEach(team => {
                        if(team.nome === jogo[0].a) {
                            team.vitorias++                            
                            team.pontos+= 3
                            team.gm = parseInt(team.gm) + parseInt(jogo[0].golsa)
                            team.gs = parseInt(team.gs) + parseInt(jogo[0].golsb)
                            team.saldo = parseInt(team.saldo) + parseInt(jogo[0].golsa - jogo[0].golsb)
                        }
                        else if(team.nome === jogo[0].b) {
                            team.derrotas++
                            team.gm = parseInt(team.gm) + parseInt(jogo[0].golsb)
                            team.gs = parseInt(team.gs) + parseInt(jogo[0].golsa)
                            team.saldo = parseInt(team.saldo) + parseInt(jogo[0].golsb - jogo[0].golsa)                            
                        }                                                
                    })      
                }
                else if(jogo[0].golsa < jogo[0].golsb) {
                    this.times.forEach(team => {
                        if(team.nome === jogo[0].a) {
                            team.derrotas++
                            team.gm = parseInt(team.gm) + parseInt(jogo[0].golsa)
                            team.gs = parseInt(team.gs) + parseInt(jogo[0].golsb)
                            team.saldo = parseInt(team.saldo) + parseInt(jogo[0].golsa - jogo[0].golsb)
                        }
                        else if(team.nome === jogo[0].b) {
                            team.vitorias++
                            team.gm = parseInt(team.gm) + parseInt(jogo[0].golsb)
                            team.gs = parseInt(team.gs) + parseInt(jogo[0].golsa)
                            team.saldo = parseInt(team.saldo) + parseInt(jogo[0].golsb - jogo[0].golsa)                            
                        }                                                
                    })
                }
                else {
                    this.times.forEach(team => {
                        if(team.nome === jogo[0].a) {
                            team.empates++
                            team.gm = parseInt(team.gm) + parseInt(jogo[0].golsa)
                            team.gs = parseInt(team.gs) + parseInt(jogo[0].golsb)
                            team.saldo = parseInt(team.saldo) + parseInt(jogo[0].golsa - jogo[0].golsb)
                        }
                        else if(team.nome === jogo[0].b) {
                            team.empates++
                            team.gm = parseInt(team.gm) + parseInt(jogo[0].golsb)
                            team.gs = parseInt(team.gs) + parseInt(jogo[0].golsa)
                            team.saldo = parseInt(team.saldo) + parseInt(jogo[0].golsb - jogo[0].golsa)
                        }                                                
                    })
                }                
                this.times = this.times.sort(function(a, b) {
                    return (b.pontos !== a.pontos ? b.pontos - a.pontos : b.vitorias - a.vitorias)
                })
                this.times = this.times.sort(function(a, b) {
                    return (b.pontos !== a.pontos ? b.pontos - a.pontos : b.saldo - a.saldo)
                })
            }
        }        
    }
}).mount('#app')