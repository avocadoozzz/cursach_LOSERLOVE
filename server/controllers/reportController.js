const { Report } = require('../models/models');
const { Service } = require('../models/models'); // Услуги
const { User } = require('../models/models'); // Пользователь
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Создание отчета по выбранным услугам
const createReport = async (req, res) => {
  try {
    const { userId, serviceIds } = req.body;

    // Получение информации о пользователе
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Получение информации о выбранных услугах
    const services = await Service.findAll({
      where: { id: serviceIds }
    });

    if (!services.length) {
      return res.status(404).json({ message: 'Услуги не найдены' });
    }

    // Сохранение отчета в базе данных 
    await Report.create({ userId, services });

    // Создание PDF-отчета
    const doc = new PDFDocument();
    const reportPath = path.join(__dirname, `../../reports/report_${userId}.pdf`);
    const writeStream = fs.createWriteStream(reportPath);
    doc.pipe(writeStream);

    doc.fontSize(20).text(`Отчет по услугам для ${user.name}`, { align: 'center' });
    doc.moveDown();

    services.forEach(service => {
      doc.fontSize(14).text(`• ${service.name} - ${service.price} руб.`);
    });

    doc.end();

    writeStream.on('finish', () => {
      res.download(reportPath, `report_${userId}.pdf`);
    });

  } catch (error) {
    console.error('Ошибка при создании отчета:', error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = { createReport };
