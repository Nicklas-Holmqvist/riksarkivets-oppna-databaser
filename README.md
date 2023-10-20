## Riksarkivets nedladdningsbara datamängder

[Riksarkivet](https://riksarkivet.se/psidata)

## Purpose
I like open source data and on the page nedladdningsbara datamängder on Riksarkivet they have a collection of different old datalist for free. The data is on xlsx or csv and have no online lists. So in this project I wanna make some of them available for online search.

The first datalist I created is Kurhuset in Östersund with over 3000 patients between 1816-1866. I wanna make this available for everyone to search, if you are a genealogist or just intrested in the patients.

Tech-stack:
* NextJS
* Typescript
* Styled-component
* Supabase

## Figma design
i did a basic design in Figma as a guideline and the colors I picked from Riksarkivets own page.

![image](https://user-images.githubusercontent.com/70426543/216139853-ae63f32c-1bf8-46ac-97db-c291444d835d.png)

![image](https://user-images.githubusercontent.com/70426543/216139966-d64b2221-a1b6-480e-b28d-a0e74eddb19a.png)

## Features
* Searchable fields: First- and lastname, title, parish, village, sickness and status
* Skeleton load in list
* Patient opens in the list and make a api fetch for the data

## Wishlist
* Sortby
* Remove all the searches and just have names and then have filter
* Add more datalists

## Last completed task

Error page

[Vercel-sida](https://historiska-databaser.vercel.app/kurhuset-i-ostersund?page=1)
