# Whereby

[Whereby]() Unofficial Node SDK. Visit [Whereby developer guide](https://whereby.dev/) for more info.

## Get started

Install the library by running `npm install @ohmunity/whereby --save`. It includes declaration file for Typescript.

### Create Meeting

```js
import Whereby from '@ohmunity/whereby';

const client = new WhereBy('YOUR API KEY');

client
  .createMeeting({
    startDate: new Date(),
    endDate: new Date(),
  })
  .then((response) => {
    console.log('response', response);
  });
```

For additional parameters, visit [Create meeting documentation](https://whereby.dev/http-api/#/paths/~1meetings/post)

### Retrieve Meeting

```js
import Whereby from '@ohmunity/whereby';

const client = new WhereBy('YOUR API KEY');

client
  .meeting('ID') // e.g. 11417010
  .then((response) => {
    console.log('response', response);
  });
```

For additional parameters, visit [Get meeting documentation](https://whereby.dev/http-api/#/paths/~1meetings~1{meetingId}/get)

### Delete Meeting

```js
import Whereby from '@ohmunity/whereby';

const client = new WhereBy('YOUR API KEY');

client
  .deleteMeeting('ID') // e.g. 11417010
  .then((response) => {
    console.log('response', response);
  });
```

For additional parameters, visit [Delete meeting documentation](https://whereby.dev/http-api/#/paths/~1meetings~1{meetingId}/delete)
