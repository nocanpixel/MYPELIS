def reparto(sistemas,contabilidad,recursosH):
    print('Alogoritmo Inversion de empresa')
    print('Sistemas : ',int(sistemas),' - 40%')
    print('Contabilidad : ',int(contabilidad),' - 30%')
    print('Recursos Humanos : ', int(recursosH),' - 30%')

cantidad = input("Cantidad a invertir ")

sistemas = int(cantidad)*0.4
contabilidad = int(cantidad)*0.3
recursosH = int(cantidad)*0.3

reparto(sistemas,contabilidad,recursosH)

