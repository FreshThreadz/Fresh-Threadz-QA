# Overview

Create a REST API for Questions and Answers widget modeled after the Atelier API. Deploy and integrate service to an existing e-commerce front-end application.

##Database

Utilize Postgres database to store relational data between Questions, Answers, and Photos. Postgres allows us to minimize redundancy in data and index foriegn keys; considering the ratio of reads to writes may skew heavily on reads I opted for Postgres to improve performance.

##Optimizations

1. The current shape of the Atelier API data is as follows:

```json
{
  "product_id": "5",
  "results": [{
        "question_id": 37,
        "question_body": "Why is this product cheaper here than other sites?",
        "question_date": "2018-10-18T00:00:00.000Z",
        "asker_name": "williamsmith",
        "question_helpfulness": 4,
        "reported": false,
        "answers": {
          68: {
            "id": 68,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-08-18T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
            // ...
          }
        }
      },
      {
        "question_id": 38,
        "question_body": "How long does it last?",
        "question_date": "2019-06-28T00:00:00.000Z",
        "asker_name": "funnygirl",
        "question_helpfulness": 2,
        "reported": false,
        "answers": {
          70: {
            "id": 70,
            "body": "Some of the seams started splitting the first time I wore it!",
            "date": "2019-11-28T00:00:00.000Z",
            "answerer_name": "sillyguy",
            "helpfulness": 6,
            "photos": [],
          },
          78: {
            "id": 78,
            "body": "9 lives",
            "date": "2019-11-12T00:00:00.000Z",
            "answerer_name": "iluvdogz",
            "helpfulness": 31,
            "photos": [],
          }
        }
      },
      // ...
  ]
}
```
To keep the data consistent and allow it to integerate to the front-end applicaiton properly I opted for nested queries as opposed to chaining together individual queries and building an object to return. The results are performant queries and which seperate computing logic from our model funcitons.

![code-sample](https://user-images.githubusercontent.com/18265165/192120539-9e55a22c-4630-4546-a438-a7328405a85a.png)

2. The query speeds for 1000 requests per second on 1 server is as follows:

![Screen Shot 2022-09-24 at 2 58 50 PM](https://user-images.githubusercontent.com/18265165/192120593-5aeb7eb9-4d8e-4e43-9ce7-7b7624e7807d.png)

  - The first optimization I implemented was to create another instance of the service API and create a load balancer. Then we routed all the traffic to the load balancer which eased the stress on the server and this allowed heavy traffic to be evenly distrubuted in a round-robin style. The result is about a 6ms improvement in average response time.
  
  ![Screen Shot 2022-09-24 at 2 59 09 PM](https://user-images.githubusercontent.com/18265165/192120723-81afba1c-dd17-45e0-96b3-7c2f7cd602a8.png)
  
  -The second optimization I implemented was to add caching to the load balancer. We shaved off even more time on the average response with about a 13ms improvement from the first optimization.
  
  ![Screen Shot 2022-09-24 at 2 59 30 PM](https://user-images.githubusercontent.com/18265165/192120816-d1aa3680-b7f8-4d68-805f-7a735fc765f4.png)

