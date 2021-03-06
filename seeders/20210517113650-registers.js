"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Registers", [
      //Состояние насоса
      {
        address: "0x1600",
        sizeRegister: 2,
        name: "revs",
        dataType: "Unsigned int",
        appointment: "обороты насоса",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: "0x1602",
        sizeRegister: 2,
        name: "P_in",
        dataType: "Float",
        appointment: "давление на входе насоса (Мпа)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: "0x1604",
        sizeRegister: 2,
        name: "P_out",
        dataType: "Float",
        appointment: "давление на выходе насоса (Мпа)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // состояние горючего
      {
        address: "0x1312",
        sizeRegister: 2,
        name: "temperature",
        dataType: "Float",
        appointment:
          "0-31 бит -> значение температуры продукта в трубопроводе (°С)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: "0x1316",
        sizeRegister: 2,
        name: "density",
        dataType: "Float",
        appointment:
          "0-31 бит -> значение плотности продукта в трубопроводе (кг/м3)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: "0x1374",
        sizeRegister: 4,
        name: "current_volume",
        dataType: "Double",
        appointment: "0-63 бит -> текущий объемный расход (м3/ч)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: "0x13fb",
        sizeRegister: 4,
        name: "current_mass",
        dataType: "Double",
        appointment: "0-63 бит -> текущий массовый расход (т/ч)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: "0x136c",
        sizeRegister: 4,
        name: "total_volume",
        dataType: "Double",
        appointment: "0-63 бит -> сумматор объема (м3)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: "0x1358",
        sizeRegister: 4,
        name: "total_mass",
        dataType: "Double",
        appointment: "0-63 бит -> сумматор массы (т)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Registers", null, {});
  },
};
