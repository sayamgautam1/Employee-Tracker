insert into department(name)
values ('Engineering'),
       ('Accounting'),
       ('Marketing'),
       ('Sales');
       

INSERT INTO role (title, salary, department_id)
VALUES ("software engineer", 120000, 1),
    ("project manager", 90000, 1),
    ("engineering manager", 225000, 1),
    ("accountant", 70000, 2),
    ("accounting manager", 120000, 2),
    ("product marketing manager", 50000, 3),
    ("marketing lead", 150000, 3),
    ("sales rep", 85000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jurgen", "Klopp", 1, null ),
       ("Jordan", "Henderson", 2, 1),
       ("Virgil", "Van Dyke", 3, 2),
       ("Allison", "Becker", 4, 3),
       ("Mohamed", "Salah", 5, 1),
       ("Sadio", "Mane", 6, 2),
       ("Diego", "Jota", 7, 1),
       ("Roberto", "Firmino", 8, 3);