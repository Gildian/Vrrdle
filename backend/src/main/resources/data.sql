-- Insert sample car data matching available sound files
INSERT INTO cars (name, make, model, mp3_file_name, category, origin_country, decade) VALUES
('BMW M3 E46', 'BMW', 'M3 E46', '/static/audio/bmw_m3_e46.wav', 'Sports Sedan', 'Germany', '2000s'),
('Ferrari 458', 'Ferrari', '458', '/static/audio/ferrari_458.wav', 'Supercar', 'Italy', '2010s'),
('Lamborghini Huracan', 'Lamborghini', 'Huracan', '/static/audio/lamborghini_huracan.wav', 'Supercar', 'Italy', '2010s'),
('Porsche 911 GT3', 'Porsche', '911 GT3', '/static/audio/porsche_911_gt3.wav', 'Sports Car', 'Germany', '2010s');
