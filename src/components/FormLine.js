import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Listbox } from '@headlessui/react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Upload, Clock, CheckCircle, ChevronRight, ChevronDown, AlertTriangle, Calendar, Users, Mail, Phone } from 'lucide-react';
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
                        className={`w-28 h-0.5 mx-3 rounded-full 
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
    const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);
    const [date, setDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [currentStep, setCurrentStep] = useState(1);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentStep === 3 && date && selectedTime) {
            setIsRecapOpen(true);
        } else {
            nextStep();
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
    };

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        });
    }, [controls]);



    useEffect(() => {
        emailjs.init("WE6sd9yLHMgOfsUtI"); // Vous devrez remplacer ceci par votre clé publique
    }, []);

    const [fileError, setFileError] = useState('');
    const MAX_FILE_SIZE = 45 * 1024; // 45KB to stay safely under the 50KB limit

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileError('');

        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                setFileError(`Le fichier est trop volumineux. La taille maximum est de ${Math.floor(MAX_FILE_SIZE / 1024)}KB.`);
                setFormData(prev => ({ ...prev, projectFile: null }));
                e.target.value = ''; // Reset file input
            } else {
                setFormData(prev => ({ ...prev, projectFile: file }));
            }
        }
    };


    const SuccessNotification = () => {
        if (!isSubmissionSuccessful) return null;

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-10 rounded-2xl shadow-2xl text-center"
                >
                    <CheckCircle className="w-20 h-20 mx-auto mb-6" />
                    <h3 className="text-3xl font-bold mb-4">Demande envoyée avec succès!</h3>
                    <p className="text-xl">Nous vous contacterons bientôt pour confirmer votre rendez-vous.</p>
                </motion.div>
            </div>
        );
    };



    // Modify the form steps rendering
    const renderFormStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
                    >
                        {/* Step 1 content */}
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
                    >
                        {/* Step 2 content */}
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        {/* Step 3 content */}
                    </motion.div>
                );
            default:
                return null;
        }
    };



    const handleFinalSubmit = async () => {
        try {
            let templateParams = {
                to_email: 'sparkline221@gmail.com',
                from_name: `${formData.firstName} ${formData.lastName}`,
                from_email: formData.email,
                phone: formData.phone,
                project_type: projectTypes.find(type => type.value === formData.projectType)?.label || 'Non spécifié',
                description: formData.description,
                appointment_date: date ? date.toLocaleDateString() : 'Non spécifié',
                appointment_time: selectedTime || 'Non spécifié',
                file_name: 'Aucun fichier joint',
                file_content: ''
            };

            // Handle file separately if it exists and is within size limit
            if (formData.projectFile && formData.projectFile.size <= MAX_FILE_SIZE) {
                const fileBase64 = await convertFileToBase64(formData.projectFile);
                templateParams.file_name = formData.projectFile.name;
                templateParams.file_content = fileBase64;
            }

            const response = await emailjs.send(
                'service_5j4zrbo',
                'template_na55y6x',
                templateParams
            );

            console.log('Email envoyé avec succès!', response.status, response.text);
            setIsRecapOpen(false);
            setIsSubmissionSuccessful(true);
            setTimeout(() => {
                setIsSubmissionSuccessful(false);
                resetForm();
            }, 3000);
        } catch (err) {
            console.error('Erreur lors de l\'envoi:', err);
            setFileError('Erreur lors de l\'envoi du formulaire. Veuillez réessayer.');
        }
    };

    // Update the file input section in step 2 to show error message
    const fileUploadSection = (
        <div className="space-y-4 col-span-1 sm:col-span-2">
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
                    className={`w-full px-4 py-3 bg-gray-700/50 border ${fileError ? 'border-red-500' : 'border-orange-500/20'
                        } rounded-lg text-white hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center justify-center transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Upload className="w-5 h-5 mr-2" />
                    {formData.projectFile ? formData.projectFile.name : "Sélectionner un fichier"}
                </motion.button>
                {fileError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2 flex items-center"
                    >
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        {fileError}
                    </motion.div>
                )}
            </div>
        </div>
    );

    // Fonction pour convertir le fichier en base64
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
        });
    };

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 sm:py-20 px-4 flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-6xl"
            >
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="relative"
                    >
                        {/* Effet de brillance d'arrière-plan */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>

                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8">
                            Partagez Votre{" "}
                            <span className="relative">
                                <span className="bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
                                    Vision
                                </span>
                                {/* Effet de soulignement animé */}
                                <motion.span
                                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                />
                            </span>
                            {" "}Avec Nous
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto text-xl leading-relaxed">
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
                    className="relative bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-orange-500/10 p-6 sm:p-8 md:p-12 overflow-hidden shadow-2xl"
                    whileHover={{ y: -5 }}
                >
                    {/* Effet de brillance sur le formulaire */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 pointer-events-none" />

                    {/* Bulles d'arrière-plan animées */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, -50, 0],
                                    scale: [1, 1.2, 1],
                                    opacity: [0.1, 0.3, 0.1],
                                }}
                                transition={{
                                    duration: 5 + Math.random() * 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="relative space-y-8">
                        <AnimatePresence mode="wait" initial={false}>
                            {renderFormStep()}
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
                                >
                                    <div className="space-y-4">
                                        <label htmlFor="firstName" className="block text-white text-sm font-medium">
                                            Prénom
                                        </label>
                                        <motion.input
                                            id="firstName"
                                            type="text"
                                            placeholder="Votre prénom"
                                            className="w-full px-4 py-3 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                                            required
                                            whileFocus={{ scale: 1.02 }}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label htmlFor="lastName" className="block text-white text-sm font-medium">
                                            Nom
                                        </label>
                                        <motion.input
                                            id="lastName"
                                            type="text"
                                            placeholder="Votre nom"
                                            className="w-full px-4 py-3 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                                            required
                                            whileFocus={{ scale: 1.02 }}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label htmlFor="phone" className="block text-white text-sm font-medium">
                                            Téléphone
                                        </label>
                                        <motion.input
                                            id="phone"
                                            type="tel"
                                            placeholder="Votre numéro"
                                            className="w-full px-4 py-3 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                                            value={formData.phone}
                                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                            required
                                            whileFocus={{ scale: 1.02 }}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label htmlFor="email" className="block text-white text-sm font-medium">
                                            Adresse E-mail
                                        </label>
                                        <motion.input
                                            id="email"
                                            type="email"
                                            placeholder="Votre adresse e-mail"
                                            className="w-full px-4 py-3 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                                            value={formData.email}
                                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                            required
                                            whileFocus={{ scale: 1.02 }}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
                                >
                                    <div className="space-y-4 col-span-1 sm:col-span-2">
                                        <label className="block text-white text-sm font-medium">
                                            Type de Projet
                                        </label>
                                        <Listbox
                                            value={formData.projectType}
                                            onChange={(value) => setFormData(prev => ({ ...prev, projectType: value }))}
                                        >
                                            <div className="relative">
                                                <Listbox.Button className="w-full px-4 py-3 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-left flex justify-between items-center">
                                                    <span>{formData.projectType ?
                                                        projectTypes.find(type => type.value === formData.projectType)?.label :
                                                        "Sélectionnez un type"
                                                    }</span>
                                                    <ChevronDown className="w-5 h-5" />
                                                </Listbox.Button>
                                                <Listbox.Options className="absolute w-full mt-1 bg-gray-800 border border-orange-500/20 rounded-lg py-1 text-white z-10 max-h-60 overflow-auto">
                                                    {projectTypes.map((type) => (
                                                        <Listbox.Option
                                                            key={type.value}
                                                            value={type.value}
                                                            className={({ active }) =>
                                                                `${active ? 'bg-orange-500/20' : ''} cursor-pointer px-4 py-2 transition-colors duration-150`
                                                            }
                                                        >
                                                            {type.label}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </div>
                                        </Listbox>
                                    </div>
                                    <div className="space-y-4 col-span-1 sm:col-span-2">
                                        <label htmlFor="projectFile" className="block text-white text-sm font-medium">
                                            Document du Projet (PDF)
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
                                                className="w-full px-4 py-3 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center justify-center transition-all duration-300"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Upload className="w-5 h-5 mr-2" />
                                                {formData.projectFile ? formData.projectFile.name : "Sélectionner un fichier"}
                                            </motion.button>
                                        </div>
                                    </div>
                                    <div className="space-y-4 col-span-1 sm:col-span-2">
                                        <label htmlFor="description" className="block text-white text-sm font-medium">
                                            Description du Projet
                                        </label>
                                        <motion.textarea
                                            id="description"
                                            placeholder="Décrivez votre vision du projet..."
                                            className="w-full px-4 py-3 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-32 transition-all duration-300"
                                            value={formData.description}
                                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                            required
                                            whileFocus={{ scale: 1.02 }}
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
                                    className="space-y-8"
                                >
                                    <div className="text-white text-center">
                                        <h3 className="text-2xl font-bold mb-2">Prendre Rendez-vous</h3>
                                        <p className="text-gray-300">Choisissez une date et un horaire pour votre consultation</p>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                                        <div className="space-y-4">
                                            <label className="block text-white text-sm font-medium mb-2">
                                                Date
                                            </label>
                                            <DatePicker
                                                selected={date}
                                                onChange={setDate}
                                                minDate={new Date()}
                                                className="w-full px-4 py-3 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Sélectionnez une date"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="block text-white text-sm font-medium mb-2">
                                                Horaire Disponible
                                            </label>
                                            <div className="grid grid-cols-3 sm:grid-cols-2 gap-2 sm:gap-3">
                                                {availableTimes.map((time) => (
                                                    <motion.button
                                                        key={time}
                                                        type="button"
                                                        className={`px-4 py-3 rounded-lg ${selectedTime === time
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

                        {/* Boutons avec effets améliorés */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 sm:mt-12 space-y-4 sm:space-y-0 sm:space-x-4">
                            {currentStep > 1 && (
                                <motion.button
                                    type="button"
                                    onClick={prevStep}
                                    className="group w-full sm:w-auto px-8 py-4 bg-gray-700/50 border border-orange-500/20 rounded-xl text-white hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 flex items-center justify-center"
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
                                className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 flex items-center justify-center"
                                whileHover={{ scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {currentStep < 3 ? (
                                    <span className="relative inline-flex items-center">
                                        Suivant
                                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                    </span>
                                ) : (
                                    <span className="relative inline-flex items-center">
                                        <Clock className="w-5 h-5 mr-2" />
                                        Prendre Rendez-vous
                                    </span>
                                )}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>

                {/* Modal de récapitulatif */}
                <Dialog
                    open={isRecapOpen}
                    onClose={() => setIsRecapOpen(false)}
                    className="relative z-50"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
                            <Dialog.Title className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                Récapitulatif de votre demande
                            </Dialog.Title>
                            <Dialog.Description className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg">
                                Vérifiez les détails de votre demande avant de confirmer.
                            </Dialog.Description>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-white mb-6 sm:mb-8">
                                <div>
                                    <p className="font-semibold text-orange-400">Nom complet:</p>
                                    <p>{formData.firstName} {formData.lastName}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-orange-400">Téléphone:</p>
                                    <p>{formData.phone}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-orange-400">Email:</p>
                                    <p>{formData.email}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-orange-400">Type de projet:</p>
                                    <p>{projectTypes.find(type => type.value === formData.projectType)?.label || 'Non spécifié'}</p>
                                </div>
                                <div className="col-span-1 sm:col-span-2">
                                    <p className="font-semibold text-orange-400">Description:</p>
                                    <p className="text-sm">{formData.description}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-orange-400">Date du rendez-vous:</p>
                                    <p>{date ? date.toLocaleDateString() : 'Non spécifié'}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-orange-400">Heure du rendez-vous:</p>
                                    <p>{selectedTime || 'Non spécifié'}</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end gap-4">
                                <motion.button
                                    type="button"
                                    onClick={() => setIsRecapOpen(false)}
                                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-700 border border-orange-500/20 rounded-lg text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Modifier
                                </motion.button>
                                <motion.button
                                    type="button"
                                    onClick={handleFinalSubmit}
                                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(249, 115, 22, 0.5)" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Confirmer le rendez-vous
                                </motion.button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>

                {/* Animation de succès */}
                <AnimatePresence>
                    {isSubmissionSuccessful && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            className="fixed inset-0 flex items-center justify-center z-50"
                        >
                            <motion.div
                                className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-10 rounded-2xl shadow-2xl text-center"
                                animate={{
                                    scale: [1, 1.05, 1],
                                    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                                }}
                            >
                                <CheckCircle className="w-20 h-20 mx-auto mb-6" />
                                <h3 className="text-3xl font-bold mb-4">Demande envoyée avec succès!</h3>
                                <p className="text-xl">Nous vous contacterons bientôt pour confirmer votre rendez-vous.</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default FormLine;

