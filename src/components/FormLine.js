import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Listbox } from '@headlessui/react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Upload, Clock, CheckCircle, ChevronDown } from 'lucide-react';
import emailjs from '@emailjs/browser';

const FormSteps = ({ currentStep }) => (
  <motion.div
    className="flex justify-center mb-12"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, staggerChildren: 0.1 }}
  >
    {[1, 2, 3].map((step) => (
      <motion.div
        key={step}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: currentStep >= step ? 1 : 0.8,
          opacity: 1
        }}
        transition={{ duration: 0.3, delay: step * 0.1 }}
        className="flex items-center"
      >
        <motion.div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white 
            ${currentStep >= step
              ? 'bg-gradient-to-r from-orange-400 to-red-500 shadow-lg shadow-orange-500/30'
              : 'bg-gray-700/50 border border-gray-600'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {currentStep > step ? (
            <CheckCircle className="w-7 h-7" />
          ) : (
            <span className="text-xl font-bold">{step}</span>
          )}
        </motion.div>
        {step < 3 && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: currentStep > step ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className={`w-10 h-0.5 mx-3 rounded-full 
              ${currentStep > step
                ? 'bg-gradient-to-r from-orange-400 to-red-500'
                : 'bg-gray-700'}`}
          />
        )}
      </motion.div>
    ))}
  </motion.div>
);

const FormLine = () => {
  const [isRecapOpen, setIsRecapOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);
  const [date, setDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [fileError, setFileError] = useState('');
  const controls = useAnimation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    projectType: "",
    projectFile: null,
    description: ""
  });

  const projectTypes = [
    { value: "health", label: "Santé" },
    { value: "commerce", label: "Commerce" },
    { value: "education", label: "Éducation" },
    { value: "technology", label: "Technologie" },
    { value: "environment", label: "Environnement" },
  ];

  const availableTimes = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
  ];

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 Mo
 

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    });
  }, [controls]);

  useEffect(() => {
    emailjs.init("WE6sd9yLHMgOfsUtI");
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.length < 2 ? 'Ce champ doit contenir au moins 2 caractères' : '';
      case 'phone':
        return !/^\+?[1-9]\d{1,14}$/.test(value) ? 'Numéro de téléphone invalide' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Adresse email invalide' : '';
      case 'description':
        return value.length < 10 ? 'La description doit contenir au moins 10 caractères' : '';
      default:
        return '';
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFileError('');
    
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError(`Le fichier est trop volumineux. La taille maximum est de ${Math.floor(MAX_FILE_SIZE / 1024)}KB.`);
        setFormData(prev => ({ ...prev, projectFile: null }));
        e.target.value = '';
        return;
      }
      
      if (file.type !== 'application/pdf') {
        setFileError('Seuls les fichiers PDF sont acceptés.');
        setFormData(prev => ({ ...prev, projectFile: null }));
        e.target.value = '';
        return;
      }
      
      setFormData(prev => ({ ...prev, projectFile: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (currentStep === 1) {
      Object.keys(formData).forEach(key => {
        if (['firstName', 'lastName', 'phone', 'email'].includes(key)) {
          const error = validateField(key, formData[key]);
          if (error) newErrors[key] = error;
        }
      });
    } else if (currentStep === 2) {
      if (!formData.projectType) {
        newErrors.projectType = 'Veuillez sélectionner un type de projet';
      }
      if (!formData.description) {
        newErrors.description = 'Veuillez fournir une description';
      }
    } else if (currentStep === 3) {
      if (!date) {
        newErrors.date = 'Veuillez sélectionner une date';
      }
      if (!selectedTime) {
        newErrors.time = 'Veuillez sélectionner un horaire';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (currentStep === 3) {
        setIsRecapOpen(true);
      } else {
        nextStep();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      projectType: "",
      projectFile: null,
      description: ""
    });
    setDate(null);
    setSelectedTime("");
    setCurrentStep(1);
    setErrors({});
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  const handleFinalSubmit = async () => {
  try {
    setIsSubmitting(true); // Indique que la soumission est en cours
    // Étape 1 : Télécharger le fichier sur Cloudinary
    let fileUrl = '';
    if (formData.projectFile && formData.projectFile.size <= MAX_FILE_SIZE) {
      const formDataForUpload = new FormData();
      formDataForUpload.append('file', formData.projectFile);
      formDataForUpload.append('upload_preset', 'Sparkline'); // Ton preset
      formDataForUpload.append('cloud_name', 'dxernpnkd'); // Ton cloud_name

      const uploadResponse = await fetch('https://api.cloudinary.com/v1_1/dxernpnkd/upload', {
        method: 'POST',
        body: formDataForUpload,
      });

      console.log('Réponse de Cloudinary:', uploadResponse);

      if (!uploadResponse.ok) {
        throw new Error('Erreur lors du téléchargement sur Cloudinary');
      }

      const uploadData = await uploadResponse.json();
      console.log('Données de téléchargement Cloudinary:', uploadData);

      fileUrl = uploadData.secure_url; // URL sécurisée du fichier téléchargé
    }

    // Étape 2 : Envoyer l'email avec EmailJS
    const templateParams = {
      to_email: 'sparkline221@gmail.com',
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      phone: formData.phone,
      project_type: projectTypes.find(type => type.value === formData.projectType)?.label || 'Non spécifié',
      description: formData.description,
      appointment_date: date ? date.toLocaleDateString() : 'Non spécifié',
      appointment_time: selectedTime || 'Non spécifié',
      file_link: fileUrl || 'Aucun fichier joint',
    };

    console.log('Paramètres pour EmailJS:', templateParams);

    const emailResponse = await emailjs.send(
      'service_5j4zrbo',
      'template_na55y6x',
      templateParams
    );

    if (emailResponse.status === 200) {
      console.log('Email envoyé avec succès!');
      setIsRecapOpen(false);
      setIsSubmissionSuccessful(true);
      setTimeout(() => {
        setIsSubmissionSuccessful(false);
        resetForm();
      }, 3000);
    } else {
      throw new Error('Erreur lors de l\'envoi de l\'email');
    }
  } catch (err) {
    console.error('Erreur lors de l\'envoi:', err);
    setFileError(`Erreur lors de l\'envoi du formulaire : ${err.message}. Veuillez réessayer.`);
  } finally {
    setIsSubmitting(false); // Fin de la soumission
  }
};

  
  const renderInput = (name, label, type = 'text', placeholder) => (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-white text-sm font-medium">
        {label}
      </label>
      <motion.input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-gray-700/50 border ${
          errors[name] ? 'border-red-500' : 'border-orange-500/20'
        } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300`}
        value={formData[name]}
        onChange={(e) => {
          setFormData(prev => ({ ...prev, [name]: e.target.value }));
          const error = validateField(name, e.target.value);
          setErrors(prev => ({ ...prev, [name]: error }));
        }}
        required
        whileFocus={{ scale: 1.02 }}
      />
      {errors[name] && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-1"
        >
          {errors[name]}
        </motion.p>
      )}
    </div>
  );

  return (
    <motion.div
      className="min-h-screen w-full overflow-hidden overflow-x-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-6 sm:py-12 md:py-20 px-2 sm:px-4 flex items-center justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-5xl overflow-hidden"
      >
        <div className="text-center mb-8 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative px-4"
          >
            <div className="absolute -inset-1 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000" />
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-8">
              Partagez Votre{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
                  Vision
                </span>
                <motion.span
                  className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
              {" "}Avec Nous
            </h2>
            <p className="text-gray-300 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
              Transformez vos idées en réalité. Prenez rendez-vous avec nos experts
              pour donner vie à votre vision innovante.
            </p>
          </motion.div>
        </div>
  
        <FormSteps currentStep={currentStep} />
  
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gray-800/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-orange-500/10 p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden shadow-2xl mx-2 sm:mx-0"
          whileHover={{ y: -5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 pointer-events-none" />
  
          <form onSubmit={handleSubmit} className="relative space-y-6 sm:space-y-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
                >
                  {renderInput('firstName', 'Prénom', 'text', 'Votre prénom')}
                  {renderInput('lastName', 'Nom', 'text', 'Votre nom')}
                  {renderInput('phone', 'Téléphone', 'tel', 'Votre numéro')}
                  {renderInput('email', 'Email', 'email', 'votre@email.com')}
                </motion.div>
              )}
  
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
                >
                  <div className="space-y-3 sm:space-y-4">
                    <label className="block text-white text-sm font-medium">
                      Type de Projet
                    </label>
                    <Listbox
                      value={formData.projectType}
                      onChange={(value) => setFormData(prev => ({ ...prev, projectType: value }))}
                    >
                      <div className="relative">
                        <Listbox.Button className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-left flex justify-between items-center text-sm sm:text-base">
                          <span className="truncate">
                            {formData.projectType
                              ? projectTypes.find(type => type.value === formData.projectType)?.label
                              : "Sélectionnez un type"}
                          </span>
                          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        </Listbox.Button>
                        <Listbox.Options className="absolute w-full mt-1 bg-gray-800 border border-orange-500/20 rounded-lg py-1 text-white z-10 max-h-48 sm:max-h-60 overflow-auto text-sm sm:text-base">
                          {projectTypes.map((type) => (
                            <Listbox.Option
                              key={type.value}
                              value={type.value}
                              className={({ active }) =>
                                `${active ? 'bg-orange-500/20' : ''} cursor-pointer px-3 sm:px-4 py-2 transition-colors duration-150 truncate`
                              }
                            >
                              {type.label}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>
  
                  <div className="space-y-3 sm:space-y-4">
                    <label htmlFor="projectFile" className="block text-white text-sm font-medium">
                      Document du Projet (PDF, max {Math.floor(MAX_FILE_SIZE / 1024)}KB)
                    </label>
                    <div className="relative">
                      <input
                        id="projectFile"
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <motion.button
                        type="button"
                        onClick={() => document.getElementById('projectFile').click()}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center justify-center text-sm sm:text-base transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        <span className="truncate">
                          {formData.projectFile ? formData.projectFile.name : "Sélectionner un fichier"}
                        </span>
                      </motion.button>
                    </div>
                  </div>
  
                  <div className="space-y-3 sm:space-y-4">
                    <label htmlFor="description" className="block text-white text-sm font-medium">
                      Description du Projet
                    </label>
                    <motion.textarea
                      id="description"
                      placeholder="Décrivez votre vision du projet..."
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-32 text-sm sm:text-base transition-all duration-300 resize-y"
                      value={formData.description}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, description: e.target.value }));
                        const error = validateField('description', e.target.value);
                        setErrors(prev => ({ ...prev, description: error }));
                      }}
                      required
                    />
                  </div>
                </motion.div>
              )}
  
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 sm:space-y-8"
                >
                  <div className="text-white text-center">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">Prendre Rendez-vous</h3>
                    <p className="text-gray-300 text-sm sm:text-base">Choisissez une date et un horaire pour votre consultation</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    <div className="space-y-3 sm:space-y-4">
                      <label className="block text-white text-sm font-medium">
                        Date
                      </label>
                      <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        minDate={new Date()}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base transition-all duration-300"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Sélectionnez une date"
                      />
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <label className="block text-white text-sm font-medium">
                        Horaire Disponible
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {availableTimes.map((time) => (
                          <motion.button
                            key={time}
                            type="button"
                            className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base ${
                              selectedTime === time
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-700/50 border border-orange-500/20 text-white hover:bg-gray-600/50'
                            } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300`}
                            onClick={() => setSelectedTime(time)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
  
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-8 space-y-3 sm:space-y-0 sm:space-x-4">
              {currentStep > 1 && (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-700/50 border border-orange-500/20 rounded-xl text-white text-sm sm:text-base hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.02, x: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative inline-flex items-center">
                    <span className="mr-2">←</span>
                    Précédent
                  </span>
                </motion.button>
              )}
              <motion.button
                type="submit"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm sm:text-base rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                {currentStep < 3 ? (
                  <span className="relative inline-flex items-center">
                    Suivant
                    <span className="ml-2">→</span>
                  </span>
                ) : (
                  <span className="relative inline-flex items-center">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Prendre Rendez-vous
                  </span>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
  
        <Dialog
          open={isRecapOpen}
          onClose={() => setIsRecapOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
  
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-y-auto mx-2">
            <Dialog.Title className="text-xl sm:text-2xl font-bold text-white mb-4">
              Récapitulatif de votre demande
            </Dialog.Title>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white mb-6">
              <div>
                <p className="font-semibold text-orange-400">Nom complet:</p>
                <p className="text-sm sm:text-base truncate">{formData.firstName} {formData.lastName}</p>
              </div>
              <div>
                <p className="font-semibold text-orange-400">Téléphone:</p>
                <p className="text-sm sm:text-base truncate">{formData.phone}</p>
              </div>
              <div>
                <p className="font-semibold text-orange-400">Email:</p>
                <p className="text-sm sm:text-base truncate">{formData.email}</p>
              </div>
              <div>
                <p className="font-semibold text-orange-400">Type de projet:</p>
                <p className="text-sm sm:text-base truncate">
                  {projectTypes.find(type => type.value === formData.projectType)?.label}
                </p>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <p className="font-semibold text-orange-400">Description:</p>
                <p className="text-sm sm:text-base break-words">{formData.description}</p>
              </div>
              <div>
                <p className="font-semibold text-orange-400">Date:</p>
                <p className="text-sm sm:text-base">{date?.toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-semibold text-orange-400">Heure:</p>
                <p className="text-sm sm:text-base">{selectedTime}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <motion.button
                type="button"
                onClick={() => setIsRecapOpen(false)}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-700 text-white text-sm sm:text-base rounded-lg hover:bg-gray-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Modifier
              </motion.button>
              <motion.button
                type="button"
                onClick={handleFinalSubmit}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm sm:text-base rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Confirmer
              </motion.button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <AnimatePresence>
        {isSubmissionSuccessful && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 sm:p-10 rounded-2xl shadow-2xl text-center max-w-sm sm:max-w-md"
              animate={{
                scale: [1, 1.05, 1],
                transition: { duration: 1.5, repeat: Infinity }
              }}
            >
              <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6" />
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Demande envoyée avec succès!</h3>
              <p className="text-lg sm:text-xl">Nous vous contacterons bientôt pour confirmer votre rendez-vous !</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </motion.div>
);
};

export default FormLine;