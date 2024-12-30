import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Listbox } from '@headlessui/react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Upload, Send, Clock, CheckCircle, ChevronRight, ChevronDown } from 'lucide-react';

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
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
                        currentStep >= step ? 'bg-orange-500' : 'bg-gray-500'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {currentStep > step ? (
                        <CheckCircle className="w-6 h-6" />
                    ) : (
                        <span className="text-lg font-bold">{step}</span>
                    )}
                </motion.div>
                {step < 3 && (
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: currentStep > step ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        className={`w-24 h-1 mx-2 rounded ${
                        currentStep > step ? 'bg-orange-500' : 'bg-gray-500'
                        }`}
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, projectFile: file }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentStep === 3 && date && selectedTime) {
            setIsRecapOpen(true);
        } else {
            nextStep();
        }
    };

    const handleFinalSubmit = () => {
        console.log({ ...formData, appointmentDate: date, appointmentTime: selectedTime });
        setIsRecapOpen(false);
        setIsSubmissionSuccessful(true);
        setTimeout(() => {
            setIsSubmissionSuccessful(false);
            resetForm();
        }, 3000);
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

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-10 sm:py-20 px-4 flex items-center justify-center"
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
            >
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Partagez Votre{" "}
                <span className="bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
                    Vision
                </span>
                {" "}Avec Nous
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto text-xl">
                Transformez vos idées en réalité. Soumettez votre projet et prenez rendez-vous 
                avec nos experts pour donner vie à votre vision.
                </p>
            </motion.div>
            </div>

            <FormSteps currentStep={currentStep} />

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-orange-500/20 p-4 sm:p-6 md:p-10 overflow-hidden shadow-2xl w-full"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.25)" }}
            >
            <form onSubmit={handleSubmit} className="space-y-8">
                <AnimatePresence mode="wait">
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
                    <div className="space-y-4">
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
                    <div className="space-y-4">
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
                    <div className="space-y-4 col-span-2">
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
                                className={`px-4 py-3 rounded-lg ${
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

                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-10 space-y-4 sm:space-y-0">
                {currentStep > 1 && (
                    <motion.button
                    type="button"
                    onClick={prevStep}
                    className="w-full sm:w-auto px-6 py-3 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    >
                    Précédent
                    </motion.button>
                )}
                <motion.button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(249, 115, 22, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                >
                    {currentStep < 3 ? (
                    <>
                        Suivant
                        <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                    ) : (
                    <>
                        <Clock className="w-5 h-5 mr-2" />
                        Prendre Rendez-vous
                    </>
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
                <Dialog.Panel className="mx-auto max-w-xl sm:max-w-2xl w-full bg-gray-800 rounded-2xl p-4 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
                <Dialog.Title className="text-3xl font-bold text-white mb-4">
                    Récapitulatif de votre demande
                </Dialog.Title>
                <Dialog.Description className="text-gray-300 mb-8 text-lg">
                    Vérifiez les détails de votre demande avant de confirmer.
                </Dialog.Description>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-white mb-8">
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
                    <div className="col-span-2">
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
                    className="w-full sm:w-auto px-6 py-3 bg-gray-700 border border-orange-500/20 rounded-lg text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    >
                    Modifier
                    </motion.button>
                    <motion.button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
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

