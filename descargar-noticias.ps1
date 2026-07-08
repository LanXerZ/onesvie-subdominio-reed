$slugs = @(
    "onesvie-entrega-48-evaluadores-estructurales-en-evaluacion-de-edificaciones-a-la-region-este",
    "onesvie-lleva-charla-sobre-vulnerabilidad-sismica-a-filial-codia-san-cristobal",
    "red-nacional-de-evaluadores-estructurales-pre-y-post-evento-reed-finaliza-proceso-de-capacitacion",
    "onesvie-completa-primera-etapa-de-capacitacion-de-la-red-de-evaluadores-estructurales-dominicanos-reed-entrega-los-primeros-196",
    "nuevos-integrantes-de-la-red-de-evaluadores-estructurales-reed-ejercitan-conocimientos",
    "onesvie-informa-que-la-6ta-edicion-del-diplomado-en-evaluacion-de-edificaciones-ha-iniciado",
    "colaboradores-de-inaipi-reciben-charla-sobre-riesgo-sismico-y-medidas-preventivas-para-afrontar-los-efectos-de-un-terremoto",
    "1020508247",
    "onesvie-reed-de-evaluadores-estructurales-se-fortalece-concluye-de-manera-exitosa-6-a-edicion-del-diplomado-en-evaluacion-de-edificaciones",
    "onesvie-entrega-al-pais-nuevos-evaluadores-estructurales-en-acto-de-graduacion-por-su-24-o-aniversario-y-reafirma-su-compromiso-con-la-vida-la-prevencion-y-la-resiliencia",
    "onesvie-inicia-7ma-edicion-del-diplomado-de-evaluacion-de-edificaciones-mas-de-cien-profesionales-seran-capacitados",
    "onesvie-y-entidades-aliadas-avanzan-en-la-preparacion-de-la-octava-edicion-del-diplomado-en-evaluacion-de-edificaciones",
    "practica-final-de-la-octava-edicion-del-diplomado-en-evaluacion-de-edificaciones",
    "reed-fortalece-formacion-tecnica-en-prevencion-sismica-con-practica-de-campo-en-el-distrito-nacional",
    "red-de-evaluadores-estructurales-dominicanos-reed-se-consolidad-sumara-85-nuevos-profesionales-capacitados"
)

$noticiasDir = "C:\Users\warlyn_estrella\Subdominio-reed\src\img\noticias"
if (!(Test-Path $noticiasDir)) {
    New-Item -ItemType Directory -Path $noticiasDir | Out-Null
}

$noticias = @()
$index = 1

foreach ($slug in $slugs) {
    try {
        $apiUrl = "https://onesvie.gob.do/wp-json/wp/v2/posts?slug=$slug&_embed"
        $response = Invoke-RestMethod -Uri $apiUrl -Method GET -TimeoutSec 15
        
        if ($response.Count -eq 0) {
            Write-Host "No se encontro post para slug: $slug"
            continue
        }
        
        $post = $response[0]
        $title = $post.title.rendered
        $date = $post.date
        $content = $post.content.rendered
        $excerpt = $post.excerpt.rendered
        $link = $post.link
        $sourceSlug = $post.slug
        
        # Extraer imagen destacada
        $imageUrl = $null
        if ($post._embedded.'wp:featuredmedia' -and $post._embedded.'wp:featuredmedia'.Count -gt 0) {
            $media = $post._embedded.'wp:featuredmedia'[0]
            if ($media.media_details.sizes.medium_large) {
                $imageUrl = $media.media_details.sizes.medium_large.source_url
            } elseif ($media.media_details.sizes.large) {
                $imageUrl = $media.media_details.sizes.large.source_url
            } else {
                $imageUrl = $media.source_url
            }
        }
        
        # Descargar imagen
        $localImage = ""
        if ($imageUrl) {
            $ext = [System.IO.Path]::GetExtension($imageUrl).Split('?')[0]
            if ([string]::IsNullOrEmpty($ext)) { $ext = ".jpg" }
            $filename = "noticia-$($index.ToString('00'))$ext"
            $localPath = Join-Path $noticiasDir $filename
            try {
                Invoke-WebRequest -Uri $imageUrl -OutFile $localPath -TimeoutSec 20
                $localImage = "/img/noticias/$filename"
                Write-Host "Descargada: $filename"
            } catch {
                Write-Host "Error descargando imagen para $slug : $_"
            }
        }
        
        $noticias += @{
            id = $index
            title = $title
            date = $date
            slug = $sourceSlug
            customSlug = "noticia-$($index.ToString('00'))"
            excerpt = $excerpt
            content = $content
            image = $localImage
            sourceUrl = $link
        }
        
        $index++
    } catch {
        Write-Host "Error procesando $slug : $_"
    }
}

# Guardar JSON
$dataDir = "C:\Users\warlyn_estrella\Subdominio-reed\src\_data"
if (!(Test-Path $dataDir)) {
    New-Item -ItemType Directory -Path $dataDir | Out-Null
}

$json = $noticias | ConvertTo-Json -Depth 10
Set-Content -Path "$dataDir\noticias.json" -Value $json -Encoding UTF8
Write-Host "Guardado noticias.json con $($noticias.Count) noticias"
