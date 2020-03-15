import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import TextField from '@material-ui/core/TextField';
import { Paper, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

class Numerki extends Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this)
        this.state = {
            selectedDays: [],
        }
    }

    handleDayClick(day, modifiers = {}) {
        const { selectedDays } = this.state;
        if (modifiers.disabled) {
            return;
        }
        if (modifiers.selected) {
            const selectedIndex = selectedDays.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day)
            )
            selectedDays.splice(selectedIndex, 1)
        } else {
            selectedDays.push(day);
        }
        this.setState({ selectedDays })
    }

    render() {
        const { classes } = this.props
        const disabledDays = {
            daysOfWeek: [0, 6]
        }
        const date = (counter, month) => {
            return (
                new Date(new Date().getFullYear() + counter, month)
            )
        }

        return (

            <div>
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Zaznacz wszystkie dni wolne od szkoły, oprocz weekendow
                        </Typography>
                    <Typography component="p">
                        Program będzie losował szczęśliwe numerki w dni od poniedziałku do piątku, w dni szkolne.
                        Cel zaznaczenia dni wolnych od nauki jest taki, że program będzie wiedział w które dni
                        powstrzymac się od losowania.
                        Przykładowa strona, ktora wyświetla dni wolne od nauki szkolnej:
                    <a href="https://www.kalendarzswiat.pl/kalendarz_szkolny">klik</a>
                        . Do informacji z niej trzeba dodac szkolne, indywidualne dni wolne(egzaminy zawodowe, święta,
                        ferie, itd..)
              </Typography>
                    <DayPicker
                        locale="Pl"
                        selectedDays={this.state.selectedDays}
                        onDayClick={this.handleDayClick}
                        numberOfMonths={10}
                        months={CalendarConstants.pl_months}
                        month={date(0, 8)}
                        fromMonth={date(0, 8)}
                        toMonth={date(1, 5)}
                        weekdaysShort={CalendarConstants.pl_week_short}
                        weekdaysLong={CalendarConstants.pl_week_long}
                        disabledDays={disabledDays} />

                    <TextField
                        id="standard-full-width"
                        value={this.state.selectedDays ? this.state.selectedDays.map(item => {
                            return (
                                item.toLocaleDateString()
                            )
                        }) : "Wybierz jakieś dni"}

                        label="Zaznaczone dni"
                        style={{ margin: 8 }}
                        placeholder="<--! Tekst wprowadzany automatycznie !-->"
                        helperText="Powyższe dni zostaną wysłane do bazy danych!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Paper>
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Second one
                        </Typography>

                </Paper>

            </div>
        );
    }
}

const CalendarConstants = {
    pl_week_short: [
        "nie",
        "pn",
        "wt",
        "śr",
        "czw",
        "pt",
        "sob"
    ],
    pl_week_long: [
        "poniedzialek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"
    ],
    pl_months: [
        "Styczeń",
        "Luty",
        "Marzec",
        "Kwiecień",
        "Maj",
        "Czerwiec",
        "Lipiec",
        "Sierpień",
        "Wrzesień",
        "Październik",
        "Listopad",
        "Grudzień"
    ]
}
const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
})

export default withStyles(styles)(Numerki);