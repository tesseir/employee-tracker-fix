INSERT INTO department (d_name) 
VALUES  ("Sales"), 
        ("Support"), 
        ("Development");

INSERT INTO position (r_name, salary, dep_id)
VALUES  ("Manager", 110000, 1),
        ("Employee-Lead", 80000, 2),
        ("Employee", 60000, 3);

INSERT INTO employees (first_name, last_initial, role_id, manager_id)
VALUES  ("Ariane", "M", 1, null),
        ("Heather", "G", 1, null),
        ("Joel", "T", 1, null),
        ("Alice", "F", 2, 1),
        ("Ibraheem", "J", 2, 2),
        ("Ned", "D", 2, 3),
        ("Tessa", "V", 3, 1),
        ("Dylan", "Y", 3, 2),
        ("Mustafa", "G", 3, 2),
        ("Meredith", "O", 3, 3),