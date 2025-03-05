const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

// Определение модели User (Пользователь)
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,    
    },
    username: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateofbirth: {
            type: DataTypes.DATE,
            allowNull: false,
     }
}, {
    timestamps: true,
    tableName: 'users',
});

// Определение модели Service (Услуга)
const Service = sequelize.define('Service', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'services',
});

// Определение модели Price (Цены на услуги)
const Price = sequelize.define('Price', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    service_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Service,
            key: 'id',
        },
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'prices',
});

const Master = sequelize.define('Master', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,    
    },
    username: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'masters',
});

// Определение модели MasterService (Какие услуги предоставляет мастер)
const MasterService = sequelize.define('MasterService', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    master_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Master,
            key: 'id',
        },
        allowNull: false,
    },
    service_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Service,
            key: 'id',
        },
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'master_services',
});


// Определение модели Appointment (Запись)
const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    client_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    master_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Master,
            key: 'id',
        },
        allowNull: false,
    },
    service_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Service,
            key: 'id',
        },
        allowNull: false,
    },
    price_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Price,
            key: 'id',
        },
        allowNull: false,
    },
    appointment_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    appointment_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'appointments',
});

// Определение модели Review (Отзыв)
const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    client_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    master_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Master,
            key: 'id',
        },
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    timestamps: true,
    tableName: 'reviews',
});

// Определение модели Availability (Доступное время мастеров)
const Availability = sequelize.define('Availability', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    master_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Master,
            key: 'id',
        },
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    time_slot: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'availability',
});

// Установление связей между моделями

// Связь User с Appointment
User.hasMany(Appointment, { foreignKey: 'client_id' });
User.hasMany(Appointment, { foreignKey: 'master_id' });
Appointment.belongsTo(User, { foreignKey: 'client_id', as: 'client' });
Appointment.belongsTo(Master, { foreignKey: 'master_id', as: 'master' });


// Связь Appointment с Review
Appointment.hasMany(Review, { foreignKey: 'appointment_id' });
Review.belongsTo(Appointment, { foreignKey: 'appointment_id' });

// Связь User с Review
User.hasMany(Review, { foreignKey: 'client_id' });
User.hasMany(Review, { foreignKey: 'master_id' });
Review.belongsTo(User, { foreignKey: 'client_id', as: 'client' });
Review.belongsTo(Master, { foreignKey: 'master_id', as: 'master' });

// Связь User с MasterService
Master.hasMany(MasterService, { foreignKey: 'master_id' });
MasterService.belongsTo(Master, { foreignKey: 'master_id' });

// Связь Service с MasterService
Service.hasMany(MasterService, { foreignKey: 'service_id' });
MasterService.belongsTo(Service, { foreignKey: 'service_id' });


// Связь Service с Price
Service.hasMany(Price, { foreignKey: 'service_id' });
Price.belongsTo(Service, { foreignKey: 'service_id' });


// Связь User с Availability
User.hasMany(Availability, { foreignKey: 'master_id' });
Availability.belongsTo(Master, { foreignKey: 'master_id' });

module.exports = { User,Master , Service, Price, MasterService, Appointment, Review, Availability };
