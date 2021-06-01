> 本文主要是学习掌握 5 个常用函数的实现与场景应用文章来源于[learnrx](http://reactivex.io/learnrx/)

# forEach

🌰: 打印 [names](#names)

## names

```js
const names = ['cc', 'chen', 'wu'];
```

使用`for`循环做法如下:

```js
var counter;
for (counter = 0; counter < names.length; counter++) {
  console.log(names[counter]);
}
```

🚀: use forEach

```js
names.forEach((name) => console.log(name));
```

# map

```js
Array.prototype.map = function (fn) {
  var result = [];
  this.forEach((itemInArray) => result.push(fn(itemInArray)));
  return result;
};

// test
JSON.stringify(
  [1, 2, 3].map(function (x) {
    return x + 1;
  }),
) === '[2,3,4]';
```

🌰: 使用`map()` 将 [newReleases](#newRelease)中数据映射成 {id,title}

```js
// answer
// newReleases.map(function(video) { return { id: video.id, title: video.title }; });
```

# filter

🌰: 现在返回 [newReleases](#newRelease)中评分为 5.0 的数据

```js
let videos = [];
newReleases.forEach((item) => (item.rating === 5 ? videos.push(item) : null));
//console.log(videos)
```

上面的逻辑分为:

1. 遍历数据
2. 将符合条件的添加到 videos 数组

这些步骤整合后即`filter()`函数

```js
Array.prototype.filter = function (predicateFunction) {
  var results = [];
  this.forEach(function (itemInArray) {
    if (predicateFunction(itemInArray)) results.push(itemInArray);
  });
  return results;
};
```

# concatAll

## 实现 concatAll

现在我们通过实现`concatAll`来进行二维数组扁平化

```js
Array.prototype.concatAll = function () {
  var results = [];
  this.forEach(function (subArray) {
    results = [...results, ...subArray];
  });

  return results;
};
```

### 案例一

🌰: 返回[movieLists](#movielists)中 所有 videos 的 id

```js
allVideoIdsInMovieLists = [];
movieLists.forEach(({ videos }) =>
  videos.forEach((item) => allVideoIdsInMovieLists.push(item.id)),
);
//console.log(allVideoIdsInMovieLists)// [70111470,...]
```

对于上面的例子使用`concatAll`再次重写

```js
allVideoIdsInMovieLists = movieLists
  .map(({ videos }) => videos)
  .concatAll()
  .map((video) => video.id);
```

### 案例二

🌰：在[movieLists](#movielists)中, 使用`map`、`concatAll`、`filter`,返回如下[结构](#result): \*: 不能使用索引即如下形势:

```
var itemInArray = movieLists[0];
```

## result

```js
[
  {
    id: 675465,
    title: 'Fracture',
    boxart: 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg',
  },
  {
    id: 65432445,
    title: 'The Chamber',
    boxart: 'http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg',
  },
  {
    id: 654356453,
    title: 'Bad Boys',
    boxart: 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg',
  },
  {
    id: 70111470,
    title: 'Die Hard',
    boxart: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg',
  },
];
```

```js
movieLists
  .map((movieList) =>
    movieList.videos
      .map((video) =>
        video.boxarts
          .filter((boxart) => boxart.width === 150)
          .map((boxart) => ({
            id: video.id,
            title: video.title,
            boxart: boxart.url,
          })),
      )
      .concatAll(),
  )
  .concatAll();
```

## 实现 concatMap

```js
Array.prototype.concatMap = function (projectionFunctionThatReturnsArray) {
  return this.map(function (item) {
    return projectionFunctionThatReturnsArray(item);
  }).concatAll();
};
```

对于[案例二](#案例二)重写

```js
movieLists.concatMap((movieList) =>
  movieList.videos
    .concatMap((video) =>
      video.boxarts.filter((boxart) => boxart.width === 150),
    )
    .map((boxart) => ({
      id: video.id,
      title: video.title,
      boxart: boxart.url,
    })),
);
```

# reduce

🌰: 在[boxarts](#boxarts)数组中返回最大的 art

```js
let currentSize,
  maxSize = -1,
  largestBoxart;

boxarts.forEach(function (boxart) {
  currentSize = boxart.width * boxart.height;
  if (currentSize > maxSize) {
    largestBoxart = boxart;
    maxSize = currentSize;
  }
});
```

## 实现 reduce

```js
Array.prototype.reduce = function (combiner, initialValue) {
  var counter, accumulatedValue;

  if (this.length === 0) {
    return this;
  } else {
    if (arguments.length === 1) {
      counter = 1;
      accumulatedValue = this[0];
    } else if (arguments.length >= 2) {
      counter = 0;
      accumulatedValue = initialValue;
    } else {
      throw 'Invalid arguments.';
    }

    while (counter < this.length) {
      accumulatedValue = combiner(accumulatedValue, this[counter]);
      counter++;
    }

    return [accumulatedValue];
  }
};
```

对于上面的例子使用`reduce`重写

```js
boxarts.reduce((acc, cur) =>
  acc.width * acc.height > cur.width * cur.height ? acc : cur,
);
```

# zip

🌰: 按引合并[videos 与 bookmarks](#z-use-data)

```js
var counter,
  videoIdAndBookmarkIdPairs = [];

for (
  counter = 0;
  counter < Math.min(videos.length, bookmarks.length);
  counter++
) {
  let videoId = videos[counter].id;
  let bookmarkId = bookmarks[counter].id;
  videoIdAndBookmarkIdPairs.push({ videoId, bookmarkId });
}
```

## 实现 zip

```js
Array.zip = function (left, right, combinerFunction) {
  var counter,
    results = [];

  for (counter = 0; counter < Math.min(left.length, right.length); counter++) {
    results.push(combinerFunction(left[counter], right[counter]));
  }

  return results;
};
```

\*\*\*:现在通过`zip`来实现上面的 demo

```js
videoIdAndBookmarkIdPairs = Array.zip(videos, bookmarks, (video, bookmark) => ({
  videoId: video.id,
  bookmarkId: bookmark.id,
}));
```

到目前为止我们已经对上面的函数已经有了基本认识与使用,是否有一种醍醐灌顶或者意犹未尽，可以用上面所有知识来挑战下面习题

# 综合题目

现在我们有四个数组[ lists, videos, boxarts, and bookmarks ](#tree-deep-data),根据数组中对象 id 关联整合出如下结构:

```
[
	{
		"name": "New Releases",
		"videos": [
			{
				"id": 65432445,
				"title": "The Chamber",
				"time": 32432,
				"boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg"
			},
			{
				"id": 675465,
				"title": "Fracture",
				"time": 3534543,
				"boxart": "http://cdn-0.nflximg.com/images/2891/Fracture120.jpg"
			}
		]
	},
	{
		"name": "Thrillers",
		"videos": [
			{
				"id": 70111470,
				"title": "Die Hard",
				"time": 645243,
				"boxart": "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg"
			},
			{
				"id": 654356453,
				"title": "Bad Boys",
				"time": 984934,
				"boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg"
			}
		]
	}
]
```

------请自觉练习-------

```js
lists.map((list) => ({
  name: list.name,
  videos: videos
    .filter((video) => video.listId === list.id)
    .concatMap((video) =>
      Array.zip(
        bookmarks.filter((bookmark) => bookmark.videoId === video.id),
        boxarts
          .filter((boxart) => boxart.videoId === video.id)
          .reduce((acc, curr) =>
            acc.width * acc.height < curr.width * curr.height ? acc : curr,
          ),
        (bookmark, boxart) => ({
          id: video.id,
          title: video.title,
          time: bookmark.time,
          boxart: boxart.url,
        }),
      ),
    ),
}));
```

# 测试数据

## newRelease

```js
var newReleases = [
  {
    id: 70111470,
    title: 'Die Hard',
    boxart: 'http://cdn-0.nflximg.com/images/2891/DieHard.jpg',
    uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
    rating: [4.0],
    bookmark: [],
  },
  {
    id: 654356453,
    title: 'Bad Boys',
    boxart: 'http://cdn-0.nflximg.com/images/2891/BadBoys.jpg',
    uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
    rating: [5.0],
    bookmark: [{ id: 432534, time: 65876586 }],
  },
  {
    id: 65432445,
    title: 'The Chamber',
    boxart: 'http://cdn-0.nflximg.com/images/2891/TheChamber.jpg',
    uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
    rating: [4.0],
    bookmark: [],
  },
  {
    id: 675465,
    title: 'Fracture',
    boxart: 'http://cdn-0.nflximg.com/images/2891/Fracture.jpg',
    uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
    rating: [5.0],
    bookmark: [{ id: 432534, time: 65876586 }],
  },
];
```

## movieLists

```js
var movieLists = [
  {
    name: 'Instant Queue',
    videos: [
      {
        id: 70111470,
        title: 'Die Hard',
        boxarts: [
          {
            width: 150,
            height: 200,
            url: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg',
          },
          {
            width: 200,
            height: 200,
            url: 'http://cdn-0.nflximg.com/images/2891/DieHard200.jpg',
          },
        ],
        url: 'http://api.netflix.com/catalog/titles/movies/70111470',
        rating: 4.0,
        bookmark: [],
      },
      {
        id: 654356453,
        title: 'Bad Boys',
        boxarts: [
          {
            width: 200,
            height: 200,
            url: 'http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg',
          },
          {
            width: 150,
            height: 200,
            url: 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg',
          },
        ],
        url: 'http://api.netflix.com/catalog/titles/movies/70111470',
        rating: 5.0,
        bookmark: [{ id: 432534, time: 65876586 }],
      },
    ],
  },
  {
    name: 'New Releases',
    videos: [
      {
        id: 65432445,
        title: 'The Chamber',
        boxarts: [
          {
            width: 150,
            height: 200,
            url: 'http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg',
          },
          {
            width: 200,
            height: 200,
            url: 'http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg',
          },
        ],
        url: 'http://api.netflix.com/catalog/titles/movies/70111470',
        rating: 4.0,
        bookmark: [],
      },
      {
        id: 675465,
        title: 'Fracture',
        boxarts: [
          {
            width: 200,
            height: 200,
            url: 'http://cdn-0.nflximg.com/images/2891/Fracture200.jpg',
          },
          {
            width: 150,
            height: 200,
            url: 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg',
          },
          {
            width: 300,
            height: 200,
            url: 'http://cdn-0.nflximg.com/images/2891/Fracture300.jpg',
          },
        ],
        url: 'http://api.netflix.com/catalog/titles/movies/70111470',
        rating: 5.0,
        bookmark: [{ id: 432534, time: 65876586 }],
      },
    ],
  },
];
```

## boxarts

```js
boxarts = [
  {
    width: 200,
    height: 200,
    url: 'http://cdn-0.nflximg.com/images/2891/Fracture200.jpg',
  },
  {
    width: 150,
    height: 200,
    url: 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg',
  },
  {
    width: 300,
    height: 200,
    url: 'http://cdn-0.nflximg.com/images/2891/Fracture300.jpg',
  },
  {
    width: 425,
    height: 150,
    url: 'http://cdn-0.nflximg.com/images/2891/Fracture425.jpg',
  },
];
```

## z-use-data

```js
var videos = [
    {
      id: 70111470,
      title: 'Die Hard',
      boxart: 'http://cdn-0.nflximg.com/images/2891/DieHard.jpg',
      uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
      rating: 4.0,
    },
    {
      id: 654356453,
      title: 'Bad Boys',
      boxart: 'http://cdn-0.nflximg.com/images/2891/BadBoys.jpg',
      uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
      rating: 5.0,
    },
    {
      id: 65432445,
      title: 'The Chamber',
      boxart: 'http://cdn-0.nflximg.com/images/2891/TheChamber.jpg',
      uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
      rating: 4.0,
    },
    {
      id: 675465,
      title: 'Fracture',
      boxart: 'http://cdn-0.nflximg.com/images/2891/Fracture.jpg',
      uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
      rating: 5.0,
    },
  ],
  bookmarks = [
    { id: 470, time: 23432 },
    { id: 453, time: 234324 },
    { id: 445, time: 987834 },
  ];
```

## tree-deep-data

```js
var lists = [
    {
      id: 5434364,
      name: 'New Releases',
    },
    {
      id: 65456475,
      name: 'Thrillers',
    },
  ],
  videos = [
    {
      listId: 5434364,
      id: 65432445,
      title: 'The Chamber',
    },
    {
      listId: 5434364,
      id: 675465,
      title: 'Fracture',
    },
    {
      listId: 65456475,
      id: 70111470,
      title: 'Die Hard',
    },
    {
      listId: 65456475,
      id: 654356453,
      title: 'Bad Boys',
    },
  ],
  boxarts = [
    {
      videoId: 65432445,
      width: 130,
      height: 200,
      url: 'http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg',
    },
    {
      videoId: 65432445,
      width: 200,
      height: 200,
      url: 'http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg',
    },
    {
      videoId: 675465,
      width: 200,
      height: 200,
      url: 'http://cdn-0.nflximg.com/images/2891/Fracture200.jpg',
    },
    {
      videoId: 675465,
      width: 120,
      height: 200,
      url: 'http://cdn-0.nflximg.com/images/2891/Fracture120.jpg',
    },
    {
      videoId: 675465,
      width: 300,
      height: 200,
      url: 'http://cdn-0.nflximg.com/images/2891/Fracture300.jpg',
    },
    {
      videoId: 70111470,
      width: 150,
      height: 200,
      url: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg',
    },
    {
      videoId: 70111470,
      width: 200,
      height: 200,
      url: 'http://cdn-0.nflximg.com/images/2891/DieHard200.jpg',
    },
    {
      videoId: 654356453,
      width: 200,
      height: 200,
      url: 'http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg',
    },
    {
      videoId: 654356453,
      width: 140,
      height: 200,
      url: 'http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg',
    },
  ],
  bookmarks = [
    { videoId: 65432445, time: 32432 },
    { videoId: 675465, time: 3534543 },
    { videoId: 70111470, time: 645243 },
    { videoId: 654356453, time: 984934 },
  ];
```
