import axios from "axios";

const apiURL = 'https://localhost:7061'

export const func_global = {
    getDayOfWeek(inputDate) {
        var dateFormat = inputDate.split('.')
        const today = new Date(2000+dateFormat[2], dateFormat[1] - 1, dateFormat[0]);
                
        const dayOfWeekNumber = today.getDay();
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return daysOfWeek[dayOfWeekNumber];
      },
    mapSettings(settingCode) {
        if (settingCode == 'SEND_MAIL')
            return 'Send email notification reminding about the upcoming fixture'
        else if (day == 'STH')
            return 'Not defined'
    },
    formatDate(inputDate) {
        // Create a Date object from the input string
            const date = new Date(inputDate);
            // Get the individual date and time components
            const day = date.getUTCDate();
            const month = date.getUTCMonth() + 1; // Months are zero-based
            const year = date.getUTCFullYear() % 100; // Get the last two digits of the year
            const hours = date.getHours();
            const minutes = date.getUTCMinutes();
    
            // Ensure single digits have leading zeros
            const formattedDay = day < 10 ? `0${day}` : day;
            const formattedMonth = month < 10 ? `0${month}` : month;
            const formattedYear = year < 10 ? `0${year}` : year;
            const formattedHours = hours < 10 ? `0${hours}` : hours;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
            // Construct the formatted date and time string
            const formattedDate = `${formattedDay}.${formattedMonth}.${formattedYear} ${formattedHours}:${formattedMinutes}`;
    
            return formattedDate;
        },
        formatDateOnly(inputDate) {
            // Create a Date object from the input string
                const date = new Date(inputDate);
                
                // Get the individual date and time components
                const day = date.getUTCDate();
                const month = date.getUTCMonth() + 1; // Months are zero-based
                const year = date.getUTCFullYear() % 100; // Get the last two digits of the year
        
                // Ensure single digits have leading zeros
                const formattedDay = day < 10 ? `0${day}` : day;
                const formattedMonth = month < 10 ? `0${month}` : month;
                const formattedYear = year < 10 ? `0${year}` : year;
        
                // Construct the formatted date and time string
                const formattedDate = `${formattedDay}.${formattedMonth}.${formattedYear}`;
        
                return formattedDate;
            },
        formatTime(inputDate) {
        // Create a Date object from the input string
            const date = new Date(inputDate);
            
            // Get the individual date and time components
            const hours = date.getHours();
            const minutes = date.getUTCMinutes();
    
            // Ensure single digits have leading zeros
            const formattedHours = hours < 10 ? `0${hours}` : hours;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
            // Construct the formatted date and time string
            const formattedDate = `${formattedHours}:${formattedMinutes}`;
    
            return formattedDate;
        },
    async importData(myfile, token, type, id) {
        // let myfile = this.$refs.myfile;
        let files = myfile.files;
        let file = files[0];
        var formData = new FormData();
        formData.append("file", file);
        return this.uploadFile(formData, type, token, id).then((resp) => {
            console.log(resp)
        })
    },

    async importDataFunc(myfile, token, type, id) {
        // let myfile = this.$refs.myfile;
        let files = myfile.files;
        let file = files[0];
        var formData = new FormData();
        formData.append("file", file);
        return this.uploadFileFunc(formData, type, token, id)
    },

    async importSportDataFunc(myfile, token, type, id) {
        // let myfile = this.$refs.myfile;
        let files = myfile.files;
        let file = files[0];
        var formData = new FormData();
        formData.append("file", file);
        return this.uploadFileFunc(formData, type, token, id)
    },

    async uploadFileFunc(data, type, token, id) {
        let url;
        if (type === 'roleRequest')
            url = `${apiURL}role-request/import/${id}/`
        else if (type === 'profilePicture')
            url = `${apiURL}profile/import`
        else if (type === 'postPicture')
            url = `${apiURL}post/import/${id}`
        else if (type === 'dishPicture')
            url = `${apiURL}dish/${id}/photo`
        else if (type === 'importProducts')
            url = `${apiURL}import/products`
        else if (type === 'importDiets')
            url = `${apiURL}import/diets`
        else if (type === 'importAilments')
            url = `${apiURL}import/ailments`
        else if (type === 'importExercises')
            url = `${apiURL}sport/import/exercises`
        else if (type === 'importTrainings')
            url = `${apiURL}sport/import/trainings`
        return axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    async uploadFile(data, type, token, id) {
        let url;
        if (type === 'roleRequest')
            url = `${apiURL}role-request/import/${id}/`
        else if (type === 'profilePicture')
            url = `${apiURL}profile/import`
        else if (type === 'postPicture')
            url = `${apiURL}post/import/${id}`
        else if (type === 'exerciseVideo')
            url = `${apiURL}sport/exercise/import/${id}`
        else if (type === 'dishPicture')
            url = `${apiURL}dish/${id}/photo`
        return axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response.data)
        }).catch(error => {
            console.log(error.response)
        });
    },
    downloadPdfFile(url, token) {
        axios.get(url, {
            headers: {Authorization: `Bearer ${token}`, 'Accept': 'application/pdf'},
            responseType: 'arraybuffer'
        }).then((response) => {
            const blob = new Blob([response.data], {type: 'application/pdf'})
            const objectUrl = window.URL.createObjectURL(blob)
            window.open(objectUrl)
        }).catch(error => {
            console.log(error.response.status)
        });
    },
    async downloadPhoto(url, token) {
        let data
        const urlCreator = window.URL || window.webkitURL;
        return axios.get(url, {
            headers: {Authorization: `Bearer ${token}`, 'Accept': 'image/png'},
            responseType: 'arraybuffer'
        }).then((response) => {
            if (response.status !== 204) {
                data = new Blob([response.data], {type: 'image/png'})
                return urlCreator.createObjectURL(data);
            }
            else return  ''
        }).catch(() => {
            return ''
        });
    },
    async downloadMp4Video(url, token) {
        let data
        const urlCreator = window.URL || window.webkitURL;
        return axios.get(url, {
            headers: {Authorization: `Bearer ${token}`, 'Accept': 'image/png'},
            responseType: 'arraybuffer'
        }).then((response) => {
            data = new Blob([response.data], {type: 'video/mp4'})
            return urlCreator.createObjectURL(data);
        }).catch(error => {
            console.log(error.response.status)
            return data
        });
    },
    truncate(text, length, suffix) {
        if (text.length > length) {
            return text.substring(0, length) + suffix;
        } else {
            return text;
        }
    },
    dateDayMonth(date) {
        date = new Date(date)
        return date.getDate().toString().padStart(2, '0') + '.' + eval(date.getMonth() + 1).toString().padStart(2, '0');
    },
    getTimePrettyFromSeconds(seconds) {
        if (seconds < 60) {
            return seconds + ' s'
        } else if (seconds < 3600) {
            return Math.floor(seconds / 60) + ' min'
        } else if (seconds >= 3600) {
            let hours = Math.floor(seconds / 3600)
            let minutes = Math.floor((seconds - hours * 3600) / 60)
            return hours + ' h ' + (minutes !== 0 ? minutes + ' min' : '')
        }
    },
    getWeekRangeFromMonday(mondayDate) {
        let from = mondayDate.getDate().toString().padStart(2, '0') + '.' + eval(mondayDate.getMonth() + 1).toString().padStart(2, '0');
        mondayDate.setDate(mondayDate.getDate() + 6);
        let to = mondayDate.getDate().toString().padStart(2, '0') + '.' + eval(mondayDate.getMonth() + 1).toString().padStart(2, '0');
        return from + " - " + to
    },
    getDatesArrayFromMonday(d1) {
        let weekDays = []
        for (let i = 0; i < 7; i++) {
            weekDays.push({
                day: this.days[i],
                date: d1.addDays(i)
            })
        }
        return weekDays;
    },
    mapSex(sex) {
        if (sex == 'WOMAN')
            return "Kobieta"
        else if (sex == 'MAN')
            return "Mężczyzna"
        else
            return 'Brak informacji'
    },
    mapBoolean(state) {
        if (state)
            return "Tak"
        else
            return "Nie"
    },
    mapPublished(draft) {
        if (draft)
            return "Szkic"
        else
            return "Opublikowane"
    },
    mapDay(day) {
        if (day == 'MONDAY')
            return 'Poniedziałek'
        else if (day == 'TUESDAY')
            return 'Wtorek'
        else if (day == 'WEDNESDAY')
            return 'Środa'
        else if (day == 'THURSDAY')
            return 'Czwartek'
        else if (day == 'FRIDAY')
            return 'Piątek'
        else if (day == 'SATURDAY')
            return 'Sobota'
        else if (day == 'SUNDAY')
            return 'Niedziela'
    },
    days: [
        {
            num: 1,
            name: 'Poniedziałek',
            short: 'PON'
        },
        {
            num: 2,
            name: 'Wtorek',
            short: 'WT'
        },
        {
            num: 3,
            name: 'Środa',
            short: 'ŚR'
        },
        {
            num: 4,
            name: 'Czwartek',
            short: 'CZW'
        },
        {
            num: 5,
            name: 'Piątek',
            short: 'PT'
        },
        {
            num: 6,
            name: 'Sobota',
            short: 'SOB'
        },
        {
            num: 0,
            name: 'Niedziela',
            short: 'ND'
        }
    ]
}