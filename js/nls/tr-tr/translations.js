define({
    "vex": {
        "cancel": "Iptal"
    },
    
    "common": {
        
        "loading": {
            "title": "Essence<span>Tool</span>",
            "description": "Herşeyi hazırlıyoruz. Lütfen sabırlı olun & yardım edin"
        },
        
        "message": {
            "controller_not_allowed": "Burada olmana izin yok. Lütfen kendini doğrula.",
            "controller_not_found": "Sayfa bulunamadı.",
            "indexed_db_not_supported": "Tarayıcınız IndexedDB’nin kararlı bir sürümünü desteklemiyor. Böyle ve böyle bir özellik mevcut olmayacak."
        },
        
        "controls": {
           "select_all_groups": {
               "text": "Tüm gruplar"
           },
           
           "select_all_projects": {
                "text": "Tüm projeler"
           },
           
           "select_all_rubrics": {
                "text": "Tüm yönergeler"
           },
           
           "select": {
               "placeholder": "Lütfen bir seçenek seçin"
           },
           
           "include_all_subgroups": {
               "text": "Tüm alt grupları dahil et"
           }
        }
    },
    
    
    "frontend": {
        
        "layout": {
            "main": {
                "header": {
                    "text": "IT E.s.s.e.n.c.e. <small>tool</small>"
                },
                "footer": {
                    "copyright": {

                    }
                },
                "menu": {
                    "items": {
                        "projects": {
                            "text": "<span class='icon-folder-open'></span> Projeler"
                        },
                        "progress": {
                            "text": "<span class='icon-chart-pie'></span> Öğrenciler"
                        },
                        "groups": {
                             "text": "<span class='icon-users'></span> Gruplar"
                        },
                        "rate": {
                            "text": "<span class='icon-edit'></span> Değerlendirmeler"
                        },
                        "import_students": {
                            "text": "<span class='icon-right-big'></span> Öğrencileri tanımla"
                        },
                        "export": {
                            "text": "<span class='icon-left-big'></span> Gönder"
                        },
                        "restore": {
                            "text": "<span class='icon-right-big'></span> Yedeği geri yükle"
                        },
                        "assessment": {
                            "text": "<span class='icon-edit'></span> Özdeğerlendirme"
                        }
                    }
                }
            }
        },
        
        "pages": {
            "import_students": {
                
                "title": "Öğrencileri al",
                
                "help": {
                    "text": "<p> Bu bölümde, bir öğrenci listesini içe aktarabilecek ve bunları bir gruba otomatik olarak atayabileceksiniz. Öğrencilerin yalnızca bir kez dahil edilebileceklerine dikkat edin, ancak birçok gruba ait olabilir. Bu nedenle, aynı öğrencilerin birçok gruba sahip olmasını istiyorsanız, onları tekrar içe aktarın, ancak başka bir grup seçin. </p> <p> Öğrencilerinizi yüklemek için bir şablon indirebilirsiniz <a href = 'asset / templates / students.csv 'indir> buradan </a> (<a href='assets/templates/students.xlsx' download>Microsoft Excel</a>)</p>"
                },
                
                "controls": {
                    "group": {
                        "label": "<strong>Step 1. </strong>Grubu seç ve yeni birini yarat"
                    },
                    "file": {
                        "label": "<strong>Step 2. </strong> Öğrencilerle bu dosyaya katıl",
                        "placeholder": "Bir dosya seç"
                    },
                    "submit": {
                        "text": "Katıl"
                    }
                },
                
                "messages": {
                    "no_file": "Almak için geçerli bir .csv eklemeniz gerekir",
                    "success": "%success% de %total% estudiantes se han añadido a '%group%'"
                }
            },
            
            "restore_backup": {
                
                "title": "Yedeği geri yükle",
                
                "help": {
                    "text": "<p>Bu bölümde bir yedeklemeyi geri yükleyebilir ve Gönderebilirsiniz. Unutmayın, önceden depolanmış tüm bilgiler kaybolacaktır</p>"
                },
                
                "controls": {
                    "file": {
                        "label": "Son geri yükleme noktanızı gönderin",
                        "placeholder": "Bir dosya seçin"
                    },
                    "submit": {
                        "text": "Sunmak"
                    }
                },
                
                "messages": {
                    "no_file": "İçe aktarmak için geçerli bir .json eklemeniz gerekir",
                    "success": "Veritabanı geri yüklendi"
                }
            },
            
            "assessment": {
                
                "title": "Öz değerlendirme",
                
                "help": {
                    "text": "<p> Bu form bir öz değerlendirmenin yapılmasına yardımcı olabilir. Kendi gelişiminizi görmek için yılda bir / iki kez tekrar etmeniz önerilir. </p>"
                },
                "controls": {
                    
                    "name": {
                        "label": "İlk olarak ful adınızı yazın.",
                        "placeholder": "Ful isim: Örneğin: Sevcan ÇELİK"
                    },
                    
                    "email": {
                        "label": "Ve bir iletişim e-postası. Sadece sonuçlarınızı göndermek istemeniz durumunda",
                        "placeholder": "Örnek: john-doe@sample.com"
                    },
                    
                    "submit": {
                        "text": "Sonuçlarınızı alın."
                    }
                }
            },
            
            "export": {
                
                "title": "Gönder",
                
                "help": {
                    "text": "<p>Bu bölümde veritabanınızı bir dosyaya verebilirsiniz. Bu dosyanın, yasalara göre korunabilecek öğrenciler hakkında gizli bilgiler içereceğini unutmayın. Lütfen bu bilgileri güvenli bir yerde saklayın ve kullanmak kendi sorumluluğunuzdadır.</p>"
                },
                
                "controls": {
                    "submit": {
                        "text": "Gönder"
                    }
                },
                
                "messages": {
                    "export_success": "Bilgi gönderildi."
                }
            },
            
            
            "projects": {
                "title": "Projeler",
                
                "help": {
                    "text": "<p>Bu bölümde projeleri yönetebilirsiniz. Bir proje, değerlendirmelerinizi düzenlemenin kullanışlı bir yoludur.</p>"
                },
                
               "confirm": {
                    "delete_projects": "Bu projeleri silmek istediğinize emin misiniz? Bu işlem geri alınamaz"
                },
                
                "prompt": {
                    "name": "Proje için yeni isim giriniz.",
                    "description": "Proje için yeni tanım giriniz."
                },
                
                "messages": {
                    "success": "Proje güncellendi.",
                    "ratings_attached": "Projeyi silemezsiniz.Eklenmiş derecelendirme var",
                    "delete": "Proje silindi."
                },
                
                "controls": {
                    "create_project": {
                        "text": "&hellip; veya yeni birini oluştur."
                    },
                    "update_project": {
                        "text": "Actualiza tu proyecto"
                    },
                    "delete_project": {
                        "text": "Seçili projeleri sil."
                    },
                    "project": {
                        "label": "Projeni ara"
                    },
                    "name": {
                        "label": "İsim",
                        "placeholder": "Lütfen yeni projeni gir"
                    },
                    "description": {
                        "label": "Tanım",
                        "placeholder": "Projenle ilgili kısa tanım yaz"
                    },
                    "submit": {
                        "text": "Onayla"
                    }
                }
            },
            
            
            "groups": {
                "title": "Gruplar",
                
                "help": {
                    "text": "<p> Bu bölümde grupları yönetebilirsiniz. Grup, öğrencileri ekipler halinde nasıl düzenleyebileceğinizin bir yoludur </p>"
                },
                
               "confirm": {
                    "delete_groups": "Bu grupları silmek istediğinize emin misiniz? Bu işlem geri alınamaz",
                    "delete_subgroups": "Bu alt grupları silmek istediğinize emin misiniz? Bu işlem geri alınamaz"
                },
                
                "prompt": {
                    "update_name": "Lütfen yeni adı yazın",
                    "name_gruop": "Lütfen grubun ismini yaz",
                    "name_subgruop": "Lütfen yeni alt grubun adını yazın"
                },
                
                "controls": {
                    "create_group": {
                        "text": "Yeni grup oluştur"
                    },
                    "create_subgroup": {
                        "text": "Alt grup oluştur"
                    },
                    "delete_group": {
                        "text": "Grubu sil"
                    },
                    "delete_subgroup": {
                        "text": "Alt grubu sil"
                    }
                },
                
                "messages": {
                    "duplicate_group": "Aynı isimli grup zaten var",
                    "duplicate_subgroup": "Aynı isimli alt grup zaten var"
                }
                
            },
            
            "rate": {
                "title": "Değerlendirmeler",
                
                "help": {
                    "text": "<p> Bu bölümde öğrencileri değerlendirebilirsiniz. Bunu yapmak için, bir proje, değerlendirme listesi ve derecelendirmek istediğiniz öğrencileri seçmelisiniz. </p> <p> Değerlendirmeler ayrı ayrı yapılabilir veya tüm grubu veya alt grubu değerlendirebilirsiniz, ancak değişiklikler yapılmaz Öğrencileri oylayana kadar tasarruf edin. </p> <p> <a href='#students'> Öğrencilerin </a> bölümünden yapılan tüm değerlendirmeleri görebileceğinizi unutmayın. </p> <p> Bir kez proje, değerlendirme listesi ve değerlendirilecek öğrencileri seçti, her kriteri <em> çok iyi </em>, <em> iyi </em>, <em> kabul edilebilir </em> veya < em> kabul edilemez </em> </p> <p> Değerlendirmenizi hatırlamanız için kanıtlar dahil etmek mümkündür </p>"
                },
                
                "controls": {
                    "project": {
                        "label": "(1) Bir grup seç"
                    },
                    "rubric": {
                        "label": "(2) Bir yönerge seç"
                    },
                    "filter": {
                        "label": "(3) Öğrenci, grup ve alt grup seç",
                        "optgroup": "Öğrenciler"
                    },
                    "rate_action": {
                        "text": "Değerlendirmeleri kaydet"
                    },
                    "evidences": {
                        "label": "Hatırlamak istediğiniz kanıtları dahil edin"
                    }
                },
                
                "tooltips": {
                    "remove_selection": "Seçimini kaldır",
                    "evidences": "Bu kriterlere kanıtları dahil et"
                },
                
                "messages": {
                    "success": "Değerlendirme kaydedildi",
                    "no_student": "Mevcut seçiminizde herhangi bir öğrenci var",
                    "no_ratings_to_save": "Geçerli seçimde kaydedilecek hiçbir şey yok"
                },
                
                "confirm": {
                    "leave_page": "Kaydedilmemiş derecelendirmeler var. Bu sayfadan ayrılacağınızdan emin misiniz?"
                }
            },
            
            "students": {
                
                "title": "Öğrenciler",
                
                "controls": {
                    "group": {
                        "label": "Gruplar"
                    },
                    "progress": {
                        "text": "ilerlemeyi görüntüle"
                    },
                    "edit": {
                        "text": "Düzenle"
                    }
                },
                
                "tables": {
                    "students": {
                        "fields": {
                            "photo": "Foto",
                            "name": "İsim",
                            "identifier": "Email",
                            "groups": "Gruplar",
                            "rubrics": "Yönergeler"
                        }
                    }
                }
                
            },
            
            
            "student": {
                
                "title": "Öğrenciler",
                
                "controls": {
                    "name": {
                        "label": "Ful isim",
                        "placeholder": "Öğrencinin ful adını yaz"
                    },
                    "identifier": {
                        "label": "Email",
                        "placeholder": "Öğrencinin emailini yaz"
                    },
                    "groups": {
                        "label": "Gruplar"
                    },
                    "submit": {
                        "text": "Güncelle"
                    },
                    "delete_student": {
                        "text": "Bu öğrenciyi sil"
                    }
                },
                
                "messages": {
                    "success": "Öğrencinin bilgileri güncellendi.",
                    "delete": "Öğrenci veritabanından silindi"
                },
                
                "confirm": {
                    "delete": "Bu öğrenciyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz"
                }
            },
            
            
            "progress": {
                "title": "Öğrenci gelişimi",
                
                "controls": {
                    "project": {
                        "label": "Projeye göre filtrele"
                    },
                    "rubric": {
                        "label": "Yönergeye göre filtrele"
                    },
                    "export": {
                        "text": "Sonuçları dışa aktar"
                    }
                },
                
                "messages": {
                    "no_student": "Bu öğrenciyi veritabanında bulamıyorum"
                }
            }
        }
    }
});