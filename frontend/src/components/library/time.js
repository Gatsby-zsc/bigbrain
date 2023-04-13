// parse time
export default function analyzeTime (date) {
  const currentTime = Date.now()
  const postTime = Date.parse(date)
  const timeStamp = currentTime - postTime

  if (timeStamp > 86_400_000) {
    // post 24 hours ago
    let retTime = new Date(postTime).toISOString()
    retTime = retTime.substring(0, 10).split('-')
    retTime = retTime[2] + '/' + retTime[1] + '/' + retTime[0]
    return retTime
  } else if (timeStamp > 3_600_000 && timeStamp < 86_400_000) {
    // post within 24 hours
    const minutes = Math.trunc((timeStamp % 3_600_000) / 60_000)
    const hours = Math.trunc(timeStamp / 3_600_000)
    return hours + ' hours ' + minutes + ' minutes ago'
  } else {
    // post within last 1 hour
    const minutes = Math.trunc((timeStamp % 3_600_000) / 60_000)
    return minutes + ' minutes ago'
  }
}
