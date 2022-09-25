const dailyBtn = document.querySelector('.daily');
const weeklyBtn = document.querySelector('.weekly');
const monthlyBtn = document.querySelector('.monthly');
const gridItems = document.querySelectorAll('.grid-item');

const getData = async () => {
  const res = await fetch('./data.json');
  const data = await res.json();
  return data;
};

const displayData = (currentEl, previousEl, timeframe, data) => {
  currentEl.innerText = data.timeframes[timeframe].current;

  const hrs = data.timeframes[timeframe].previous;
  if (timeframe === 'daily') {
    previousEl.innerText = `Yesterday - ${hrs}hrs`;
  }
  if (timeframe === 'weekly') {
    previousEl.innerText = `Last Week - ${hrs}hrs`;
  }
  if (timeframe === 'monthly') {
    previousEl.innerText = `Last Month - ${hrs}hrs`;
  }
};

const changeDataOnCards = (timeframe) => {
  gridItems.forEach(async (item) => {
    const currentElement = item.querySelector('.current span');
    const previousElement = item.querySelector('.previous');

    const data = await getData();
    data.forEach((dat) => {
      if (dat.title.toLowerCase().split(' ').join('-') === item.classList[1]) {
        displayData(currentElement, previousElement, timeframe, dat);
      }
    });
  });
};

const init = () => {
  changeDataOnCards('weekly');
};

init();

dailyBtn.addEventListener('click', () => {
  dailyBtn.classList.add('active');
  weeklyBtn.classList.remove('active');
  monthlyBtn.classList.remove('active');
  changeDataOnCards('daily');
});

weeklyBtn.addEventListener('click', () => {
  dailyBtn.classList.remove('active');
  weeklyBtn.classList.add('active');
  monthlyBtn.classList.remove('active');
  changeDataOnCards('weekly');
});

monthlyBtn.addEventListener('click', () => {
  dailyBtn.classList.remove('active');
  weeklyBtn.classList.remove('active');
  monthlyBtn.classList.add('active');
  changeDataOnCards('monthly');
});
