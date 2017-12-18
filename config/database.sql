
select * from cinemas;
-- DROP TABLE IF EXISTS cinemas;


CREATE TABLE cinemas(
    id SERIAL PRIMARY KEY,
    api_id INTEGER NOT NULL,
    name VARCHAR(300) NOT NULL,
    area VARCHAR(300) NOT NULL,
    address VARCHAR(300) NOT NULL,
    imgurl text
);

-- INSERT INTO cinemas(api_id, name, area, address, description, imgurl) VALUES (267, 'Passage Kino', 'Neukoelln', 'Karl Marx Str. 131, 12043 Berlin', 'This is the Passage', 'https://d6ff5x4cg2kom.cloudfront.net/system/uploads/cinema_more_image/image/54ef09bc683138488b4b0000/passage_detail_04_2x.jpg');
-- INSERT INTO cinemas(api_id, name, area, address, imgurl)
-- VALUES
--     (250, 'Acud Kino', 'Mitte', 'Veteranenstraße 21, 10119 Berlin','http://www.berliner.de/sites/default/files/orte/bilder/acud.jpg'),
--     (267, 'Passage Kino', 'Neukoelln', 'Karl Marx Str. 131, 12043 Berlin','https://d6ff5x4cg2kom.cloudfront.net/system/uploads/cinema_more_image/image/54ef09bc683138488b4b0000/passage_detail_04_2x.jpg'),
--     (268, 'Neues Off', 'Neukoelln', 'Hermannstr. 20, 12049 Berlin','http://archiv.yorck.de/static/assets/cinemas/100013/gallery/Neues_Off_1.jpg'),
--     (1266, 'B-Ware Ladenkino', 'Friedrichshain','Gärtnerstraße 19, 10245 Berlin','https://lh5.googleusercontent.com/p/AF1QipO5fkhIrteC5bDIg5vitBLAb9yDejmlz8oHNwT1=w408-h306-k-no'),
--     (266,'Babylon Kreuzberg','Kreuzberg','Dresdener Str. 126, 10999 Berlin','https://d6ff5x4cg2kom.cloudfront.net/system/uploads/cinema_more_image/image/54ec915868313813e3210000/babylon_detail_05_2x.jpg'),
--     (1149,'Babylon Mitte','Mitte','Rosa-Luxemburg-Straße 30, 10178 Berlin' ,'https://www.berlin.de/binaries/asset/image_assets/2232607/source/1458748541/418x316/'),
--     (249, 'Brotfabrik im Kunst-Kulturzentrum', 'PrenzlauerBerg', 'Caligariplatz 1, 13086 Berlin','https://lh5.googleusercontent.com/p/AF1QipPn_jSY3ZuFv7LcZkX39t7VWZUu3lkADCvNXkzV=w408-h306-k-no'),
--     (247,'Central-Kino','Mitte','Rosenthaler Str. 39, 10178 Berlin','https://lh5.googleusercontent.com/p/AF1QipNSi-EJfU6r_dt3x9OyqlKn94HzhtWiEzgF6iwX=w408-h229-k-no'),
--     (152,'Cineplex Neukölln','Neukoelln','Neukölln Arcaden, Karl-Marx-Straße 66, 12043 Berlin', 'https://lh5.googleusercontent.com/p/AF1QipO7s-ZWCizDP3c21oenF-WjiVGZLe5uB50ofSR3=w408-h271-k-no'),
--     (1050,'Kino in der Kulturbrauerei', 'PrenzlauerBerg','Schönhauser Allee 36, 10435 Berlin','https://lh5.googleusercontent.com/p/AF1QipOHuAYL_GZ6AWhw5Z6lPR8WRRHy4xSEaHZT-rGn=w408-h229-k-no'),
--     (1585,'City Kino Wedding im Centre Français de Berlin', 'Wedding', 'Müllerstraße 74, 13349 Berlin', 'https://lh5.googleusercontent.com/p/AF1QipMlEPU27LkgxjDvk3Q9XnZisgQZ50uWFjsJ3DZ1=w408-h306-k-no'),
--     (240,'Eiszeit-Kino','Kreuzberg','Zeughofstraße 20, 10997 Berlin','https://lh5.googleusercontent.com/p/AF1QipO1RdajjTS3KgucNn0R2PTmnKfbR5C7NIxSyqdz=w408-h271-k-no'),
--     (260,'Filmtheater am Friedrichshain','Friedrichshain','Bötzowstraße 1-5, 10407 Berlin','https://lh5.googleusercontent.com/p/AF1QipNrLnOUdRZG8vu17FMrFWk087-q8pKX1Jdzxjca=w408-h228-k-no'),
--     (245, 'fsk am Oranienplatz', 'Kreuzberg','Segitzdamm 2, 10969 Berlin','https://lh5.googleusercontent.com/p/AF1QipOYtsD_s0arHSbjIQR6neOVwVyo18-ZmOgbX-XX=w408-h272-k-no'),
--     (939,'Hackesche Höfe Kino', 'Mitte','Rosenthaler Str. 40 -41, 10178 Berlin','https://lh5.googleusercontent.com/p/AF1QipNmXE6b8Cq3B17_zmdqL67thgE7YRWMVkNmweLX=w408-h229-k-no'),
--     (1586, 'IL KINO', 'Neukoelln', 'Nansenstraße 22, 12047 Berlin','https://lh5.googleusercontent.com/p/AF1QipPNqQpGky5GhruFG6f2shaapfseL6Hvro6hvyg-=w408-h544-k-no'),
--     (263, 'Kino International', 'Friedrichshain','Karl-Marx-Allee 33, 10178 Berlin','https://lh5.googleusercontent.com/p/AF1QipPQTJn7TspCmQ28h9ZAr8ZQvHU-P3mwo2AVwHSE=w408-h271-k-no'),
--     (940, 'Kino Intimes', 'Friedrichshain', 'Boxhagener Str. 107, 10245 Berlin','https://lh5.googleusercontent.com/p/AF1QipPZFzBX7j_FJOpOwx8o5lh_506vHg-M7tBjRW7k=w408-h306-k-no'),
--     (1178, 'Kino Krokodil', 'PrenzlauerBerg','Greifenhagener Str. 32, 10437 Berlin','https://lh5.googleusercontent.com/p/AF1QipPFgj-Z8kSpfYfSSJFaCYdpHA6vzX2Tio3ZatzU=w408-h306-k-no'),
--     (997, 'Lichtblick Kino', 'Mitte', 'Kastanienallee 77, 10435 Berlin','https://lh5.googleusercontent.com/p/AF1QipNiTasIZSqV9mPnEvrCDkyVzhY7RMNpZPXCWvo=w408-h317-k-no'),
--     (253, 'Moviemento', 'Neukoelln', 'Kottbusser Damm 22, 10967 Berlin', 'https://lh5.googleusercontent.com/p/AF1QipMPSU17qcHAcYT9NADRHXprVtVMVx-IXKNJFTBp=w408-h260-k-no'),
--     (264, 'Odeon', 'Schoeneberg', 'Hauptstraße 116, 10827 Berlin','https://lh5.googleusercontent.com/p/AF1QipOEm_hOUQUh0N2HUAGKWVluWFRTpyru0YPSFJ5t=w408-h292-k-no'),
--     (1308, 'Regenbogen Kino', 'Kreuzberg','Lausitzer Str. 22, 10999 Berlin','https://geo0.ggpht.com/cbk?panoid=uim79z53ORT4ds3WYYAAuQ&output=thumbnail&cb_client=search.TACTILE.gps&thumb=2&w=408&h=200&yaw=305.66064&pitch=0&thumbfov=100'),
--     (261, 'Rollberg Kino','Neukoelln','Rollbergstraße 70, 12053 Berlin','https://lh5.googleusercontent.com/p/AF1QipOmcJ3X90MaZgyHJcYAXIkrhzsELcxvqFCxwlmf=w408-h271-k-no'),
--     (254, 'Sputnik Südstern','Kreuzberg', 'Hasenheide 54, 10967 Berlin','https://lh5.googleusercontent.com/p/AF1QipNB8YmcY00uWcY_swb6L309vdAjQ1W1ESUH-UJj=w408-h229-k-no'),
--     (256, 'Tilsiter-Lichtspiele','Friedrichshain','Richard-Sorge-Straße 25A, 10249 Berlin','https://lh5.googleusercontent.com/p/AF1QipMGJ_yYDKXWnkj3D3jHHglQ28t38UjwT615PJlE=w408-h229-k-no'),
--     (58160,'Wolf Kino', 'Neukoelln','Weserstraße 59, 12045 Berlin','https://lh5.googleusercontent.com/p/AF1QipO5iAJl7CG5assgnsQCBUCh-itqNYjeQVr28fPk=w408-h306-k-no'),
--     (259, 'Xenon Cinema Berlin', 'Schoeneberg','Kolonnenstraße 5-6, 10827 Berlin','https://lh5.googleusercontent.com/p/AF1QipN9VMfMflTDLkf7hRh4u1tfPSho9un6I-Ho9J9P=w408-h306-k-no'),
--     (1265, 'ZUKUNFT am Ostkreuz','Friedrichshain', 'Laskerstraße 5, 10245 Berlin','https://lh5.googleusercontent.com/p/AF1QipNByS4l_4-eaJw0adOqVwTuFTPoH2RD_k8iAWWJ=w408-h273-k-no'),
--     (99, 'Alhambra Kino', 'Wedding', 'Seestraße 94, 13353 Berlin', 'http://img.fotocommunity.com/kino-alhambra-berlin-wedding-f083b161-bc5b-4f8e-aec3-f46d9325322f.jpg?height=1000');
