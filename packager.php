<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['sb3'])) {
    $tmpName = $_FILES['sb3']['tmp_name'];
    $outputZip = 'project_' . time() . '.zip';

    $zip = new ZipArchive;
    if ($zip->open($outputZip, ZipArchive::CREATE) === TRUE) {
        $zip->addFile($tmpName, 'project.sb3');
        $zip->close();
        header('Content-Type: application/zip');
        header('Content-Disposition: attachment; filename="' . $outputZip . '"');
        readfile($outputZip);
        unlink($outputZip);
        exit;
    }
}
?>
<!DOCTYPE html>
<html>
<head><title>Scratch Packager</title></head>
<body>
<h2>Scratch Project ZIP Packager</h2>
<form method="post" enctype="multipart/form-data">
  <input type="file" name="sb3" accept=".sb3" required />
  <br><br>
  <button type="submit">Download ZIP</button>
</form>
</body>
</html>
