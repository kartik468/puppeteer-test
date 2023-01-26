"use strict";

const puppeteer = require("puppeteer");

const URL =
  "https://www.google.com/search?q=movies&oq=movies&aqs=chrome..69i57j0i131i433i512l5j0i10i131i433j69i65.6439j0j7&sourceid=chrome&ie=UTF-8";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL, {
    waitUntil: "networkidle2",
  });

  const header = `
  <header style="margin: auto; width: 40%">
    <img style="float: left; marginRight: 8px; marginLeft: 36px; width: 25%"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADKCAMAAAD5C941AAADAFBMVEX///8YMVP///sfMVNiaHYlMVMYMVT+//////T7///59fAYMl718Ov///hvc373//8sMVNQWWoYMVcYMln//fn///H//+v//t88MlMYNnIYMmMaOF/t/v/n/f///uX/7cf92qn/2pwyMVPy/v82baQjUYQ3MVP//db/9McmWpVcNVPU+f/T6vi/4/f/77SCZWFAS2BPO1NDMlPi/v/f+P/N8f6i2/dfodUmarPvuof6uXgYOWkwQFpBPVS46/5yqNP+0ZMYPYAaQHIbP2qSWlVfQFMxNlMfNFPU8/7w+P3F7PyGwuvo39j/+tD/9M3nw6LyxJYYMmkfP2K3bVegXlVuR1NlOVNKN1OS0vRlufD/+u1xrtsbV6I5Y4/GlXdiZ3SognHEimwsSmmUYVqna1lFRVZ6UVUkN1VeSVTD9P+V2vz4+fm24Pf/9+na4uh+uuW+0N2MsM/y3cdAg7/937j/4Ku3qaKEgITeqYDdoXnSmHfnp3PgoXK8h2/Ylmu9e2KndWLTiGCca1w2RFtuUVcsPFaIT1M5OVNSMlOr3viXyeX/9+L06+FVndVnn8zo2MtimMj/8r//67//57lsj69bg63/56pNfKgjYKMwYpocUpiompX4xY4ZS43otIhicYQaR4HusHsdR3t9cXEiQ2qUbGVSTlmWUVOf4v6u5/3s8PPL4/Kb0O+w1+5xvO797tRJlNFTj8VOhsDizbtUh7nt0LJFfLH71KJ0iaBhgJ7YtJk0V4pMZoj7w4NlXWdlTVeJWlZRRFV8Q1OLyvKPxejp6OenzedYqON8sNxmqtydwNo8i8+rtsL74sHUxLeZpK/JuK3yy6Q+ZpuHj5rFqpdqe5Gaj43lr4I5Wn9VZntucHolTneGeHaQdXDcjmDKgV+tYVNsQFOOveLT2d+tx9v/99nJztO5v8kve8SpsLiLl6VPcpa8oI8gUo7WqohGWHDjmGZ0XWGasMJmkL17mrnZvqizloWaiYN1dX40UHNdZHJ8z/vnvZmafnVGXmhMg7U8GziyAAAOEUlEQVR42uza929NURwA8O/3Xu/1VT1K+16fFlWU2luMmo8aoaVCrdi7NGbt1aq9dxFih1ohKDFj71l7xQhiFDEaIZGWH+i545z7em97X+7nD3gv39zzPd9xLxgMBoPBYDAYDAaDwWAw6Jg1t7RoD9Ar67DYUbmkpNy8+up0NOgQd71iGFLouWRIc9AZ6xgH0mo0tDjoiWW0A+mZN+oqvKAoZOJ1MAn0wj7RhGzMd5+BTiychsycnXVSGIhTScP/HOhCbR4VaFMD9EBZcOYbzUAHgiqjEj7z8kHOFx7HoxJtBkLOZx1vQkWG66GYB1VBRZx6eHSW0SVRkdeekPNZxhZDJUrr4sK0Xq/ojeycO0EXbMNib446ml9UHxMKuAh60SmPhDktb30i46uph1JHJXCTiUi6suAulpXBTIJ3gLuwPyWCOwPuwjaRGHxm6WSsk2cZx2deOJxym+BsUzCTgu7z5Eptcd+cs6whNoDvy4N7sLYmh9oVVcEt2J/w6K4dit8kExIKzAV30GoyCgjWxwZMRmAcCqlZCHSPK9oOhZjPgu7ZfvZHQYnVQe8sY8JQmGoPjpOWhW1J76YoLFGVYW7219tp9/NKuZ/35qXmkBVCeplQWKPtkPXshyqaUF7k4TOe4LJFxzXdpts/RCEd//ou//3ivijCnKhC52W540BaAZ1d7SaboJj3atyUFaYiveBB4ALb6MooZqUa61jrR2Sx2wPYcb7pLLsmh4nm23JVKlxIHLJYUQ1o2ebMvxa7alTetPvdMvzYbEIRXgvUabsOlEHM8nM5uOWV2O9p3U4gHecXlVrK1Q5kUXAWSOM6zbmy6mF/ZLD+glpD3OoqyMJfOrjB829tmI5sHjwDtTQ4hlJYNsLc5W/9kVnp8qCa8N5sF0phELHr3dEwXkFsag4C3GNkUGA3CLLv/VXXhOzM+6uCmkY2YTmVMwUzbe+jPjwqELC0MKjKsob+SvE5D6RO+x71QUXqsPaq7Ip0rYx0vAT6dm7Eo7qoUJfCoDpLxNQElNU08vAFcuS53N2BitUsDhqw7bt9tFJohgReeJi7lzyEDO1lVwe64H0L0Abn+1d4Y57yizprxCdvdEWjU6A1wZlrrgdZ2CZM59E1Fz1BY1ahj3iDt2Y+yRH/7CZy8o1CseYwZ6refl1PoOsaDgCtceOEsu7f/OAWxfGYBQpuB82VmsxLrPEzagdt1U8IjY+Pr/RHAk8OqflAcw2ikFDnHPxlH0tXtgNSU66+en56my+XAbgpZNJVBc0V6eEtniB+bU0oa+PBSzHRvhz8Z52DOJf1QHsh04SaL88/L5/kipsz5XPMNg5IRfsSs+9J0B4n1E03rJcedmO5vfTnmGjRtwRETi4oDtortQUJ5j2FIOQ4Sun59kVzydkxZ3zIJvR60NlhsWRs/ZYngaTaJqLCbIVsYJk4HQmRUtekz9JyICOIKCEFdkJ2CGyMLLyWlANZ4UQBNc/NB9nhiINhpj64g65tJep4iWaQHfwmISWfu7Rv7o54E5WuBmSLBlWQykbiRIpaNoO4gjtCtrCNKYYUgi94Aq2QTTzRs27zzQAaW3jchLJKVAN69rHEuQz4kSvd2uQ3r4jqryZrLdmDGcC4nTtSUvynQkPjU1MuxXiANoq05VHS+jMewKRCGZQWWSk1eYg25aFoe7nXIoxabUFZ5p73vsR4gupsT1BCYjn2j77aI5UHyUnqH8/AXkhQXn933WqHtJxLkkBlXK0TorGxNvT2iCbIIoCyfirn11Ys3wYAmxGbwpCRf/1CoKqgGcL35EzGi/dDVFNk5vO2PKhp4e/2rjO0qSgK571nWmsNjQnaWBuxUeMeda9qncVR9xYXWltEqdaquBUXblFUXNS9cOCeuFDce2/FPcCFijhDRLQ5975z7n1PBcn3O8nLfe+ecc/5zvcOyhfl8IYJ7jmPIn7TfLpD7RphgnOQ0nXOPH+iEuGj/GTLnj1bWnfWBTdGiM3npijyCJljrl9R2/vIP5eXlvZhtIbyiHDKl0sxhCKmtbpsaRdvrkhOSEjWibAVhFwJGCAQxu4G5qzs/YFqYzErSBWKJcOsimF0LGECG/hWkp0gMuAWKjT51vbvVzeJxgZWonoKMdHHK1IwtdbSvgnVW0c1pKe06pU2iknoFyGfIHeJo5e66Dlf/9aKWXBMl4zmts9ISitJki/UUlNMQ1RbiwwedooT5jVRIl2urh5qoE4gfKZjeZkeOEjXcTiA+0K4nJgdT9o84Cbie5wSfdjt+6xSGe0h9Kb10Mj3ar2fY/vuJvA/SDcPXZsih2WpmG6bXZD17ifJwcOx/Pl4+xh5ApA+fzc+ViaMZd2qox3pXC/ahpNHVb2dmbMFv0UJN8uSCr+N36SgvFp66U4ezXS8cwz3ts0tEaPfMkjvxvXSRwQIzt2sBtP16lyL4z24kG9uS2I3fQmbyK68/zWvGD1h9xpNG+aU49nyPc43tkT7Vt7Jo8+9jBxm51jCUWECsDzCa4Rxqrka2yVsiwYRkMXAjxzh4dDjo4l1rbqKcVRtq0NkgSjg/tEyALYelUorKeaeYHBEyfjokto0VrdgENkSGh2t1u0glW/UIfpJV0Kyn5Q2dmyypp9mTglluJMRdt24n2uwC9DAogM3VgrbpZSlnEZ66GepZx75GWm+gaoPK3SXt6gX1qmCQoHqOWASCxsEmu1t9r5cRShJjdBZ2Z43v7eQ1JxpL1LwYySeMi+prlPqrTUR3CFmpAxPJTw4box1XD0O2rcq6M/oPrq8nTysHz7mv2M8o9sYBhSK7MzoA/YlNArB3oqavjyO+Ogg+w3yD7OO0lCjs5S8x7yXaAemZGuu2HcEt5XBCx01q0NGBoRzS/7f3Wld8CvFIJ3Cy8r5VskKUC5Zq8dTPMCJ5IEazPFgVwI6zYxxBLrN7NYyR4PIlZzn1la/ExnLdkC7M99022JgLGDb5b0Lm3F+owMfgtNSYTQmD3wECHcjjlLKjGSxiB2bIhDuZSU3SQPUscWNtCa87OgfjT3xrprC9IOZDxstCUfbBW3QKQMYDmFEhEhsya5Zw29BB0Y4/888yPpL1bH0KmoVqsIO00tqAhHVkEIqasNMnzPty3zw5yHLPtcdxChAOCQS/WK8THlvN6nOqrDQDm2jVwp0A1A3YRs0uhbi1dnFHtZ3YF5Dz/enBLAqIZ4EPpZ4F250WUehdxJmR3aWUdBO8JF3FQY2RQOeNjakNmM/Hp5tQ4EDwyiajbtYWcT6COIYk5dZmsMWVzEU9bzhbY0sDnozmJVDwLkOiJq98MUB4wj8mPOT5OJQb7awPFn9Cat0V9FIi4v3wlxAfnHQm8HKC46sd1i5TUPw5FCZmMKlNMyh2IYrtMXh3oyI29ji4l14KPCnoB5Q9aOEgnDYD0G9mYWKIRqyuHxFaUPhieMyW30FRAsZC+K4weOobEcW178orVasVnYhul+JK/H0i744+SeHTcosWsdqvSb9qoy9zY/0adBuCO7NcLxi2hx65GFdINfPgWzn8wdhDN811IoeeaBDMSJ6pY7CFpdzkJ08FL7h7OWBAwc+Ay9q4+fNzophWCiQ95Z5W6Ad3coepD5EJurTygz4kcRNnj1DjTzGi/ZM5N/05uxpEU6/FlFvbNMUVkOxAV5bW1hWdLZ0HCILQBZVqlojlKx3DrGtHJah4bViGCm8zFN/WQt+5ME7DALNqY1hQHkRKX7IsqvDO+jvbnWxh9zghsXLNhw1WPgKCRgNUKtDfa6SGxvhjXchz1u04un4xJzEhuPKIrOJsfQWFm7wjmOhhAKRi1JQzznYi1Et6E4ZalXgshkQu4sRpD41nj+BhXAIZ7/8ZGZ0PUViV/oNnnljQzbmxy7JZhk4OoQSmRp5tkQTiRbjxRSnYN4OLd4CAE9g/MYLbCvA1b11k9bm4sxmpUpXH5Wq+s0C3pjnPNj0T6zDI3e8BR9GJLdEtRxsV8rwSCxgdaCnRkqs1KGa9PDRzOV2XkO7IilAgpo/GiNtgJMDjJwof7BEd/g6Z5NWBolttlEeLuOpOKfYyf3GpghBKojzfAmpMTvnEWL18R6Xy/Cx7xrG0AFQZ8NqGo31SDzNd0J1Oz/bskuchrMy8UfH/5GQlzv7/L6+9mnv99rFGf8xschI8f36AYK0L/bCt9LBXpJhks2yaxeePmp02PeWuGk+cd8VuiSbEtxxfoQU+DHj2clHjfxXabT57PylKzRUgZII9ZWGqj4mf01KRj91IhRR78cuUu1rXHKCyW/QTQQ5mBQKlCMoYP99ebf4OMU4buixQtRBLsUshFcUG98fajWXTIqro8nDsQlJKpF+jZRUsRs5uEgqDtKlEuisBvMlptO7af9oOBAy0MwXhU03QeQzpCMgBkpFO/P1/dNfW42ubTe4kHQVki7HTX3pidXg2uCepLe45bBoNbkcMpLkM/FM/q/ZXUGB0n/ewS75YDPV0MuOEiUiQsh5oTFEtek+2SRhosUYHg4TzVWazyonuvtLjZdRndizzoQXRo0RikZX+0ZIjKHjE5bwZIlsSarNW8nLSyhQXHJcO0lwexQ3T/reSkwWQIOXCvVUl/ECA81AYMnQ8krZyTtSfnlemo80vDRYwfgSqz/xvPOBUTk8ddKupR5MeWgPYmuSy0vzHfZ5k6YZz0zRiVN7bw64CLiMmYKCgWWagZ1zJGU27RxZdjy9X9/Mi5z9cH1v4DapfS1jx0lwGbPRvtFpn0rPD23GzhkXzjz+E9J3WSdv9r0H7HqWH8i4dObpo8P/zfu2gwgiiCCCCCKIIIIIIoi/ie9WUXmxZTW57gAAAABJRU5ErkJggg=="
        alt="Pivohub" />
    <p style="font-family: arial; float: right; width: 55%; color: red; margin-top: 24px; font-size: 10px">
        <b>My header</b>
    </p>
    </header>
  `;
  const footer = `
  <footer style="margin: auto; width: 40%">
    <img style="float: left; marginRight: 8px; marginLeft: 36px; width: 25%"
        src="data:image/png;base64,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"
        alt="Pivohub" />
    <p style="font-family: arial; float: right; width: 55%; color: red; margin-top: 24px; font-size: 10px">
        <b>My footer</b>
    </p>
    </footer>
  `;

  await page.pdf({
    path: "pdfs/site.pdf",
    format: "letter",
    displayHeaderFooter: true,
    headerTemplate: header,
    footerTemplate: footer,
    margin: { top: "100px", bottom: "200px" },
    printBackground: true,
  });

  await browser.close();
})();
